import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { taskStatusOptions as statuses } from '../constants/status.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "../data/todos.json");

function readTodos() {
  try {
    const data = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function validateStatus(status) {
  if (!status) return 'todo'; // Default

  const normalizedStatus = status.toLowerCase();

  if (statuses.includes(normalizedStatus)) {
    return normalizedStatus;
  }

  const error = new Error(`Invalid status: ${status}. Allowed values: ${statuses.join(', ')}`);
  error.statusCode = 400;
  throw error;
}

function writeTodos(todos) {
  writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

export const todoService = {
  getAll() {
    return readTodos();
  },

  getById(id) {
    const todos = readTodos();
    return todos.find((todo) => todo.id === id);
  },

  create(todoData) {
    const todos = readTodos();
    const status = validateStatus(todoData.status);

    const newTodo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      status: status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    writeTodos(todos);
    return newTodo;
  },

  update(id, updates) {
    const todos = readTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    let updatedStatus = todos[index].status;
    if (updates.status !== undefined) {
      updatedStatus = validateStatus(updates.status);
    }

    todos[index] = {
      ...todos[index],
      ...updates,
      status: updatedStatus,
      updatedAt: new Date().toISOString()
    };
    writeTodos(todos);
    return todos[index];
  },

  delete(id) {
    const todos = readTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    writeTodos(todos);
    return true;
  },

  getStatistics() {
    const todos = readTodos();
    const total = todos.length;

    // Dynamically count all statuses
    const statusCounts = todos.reduce((acc, todo) => {
      const status = todo.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Extract specific counts (maintains backward compatibility)
    const todo = statusCounts.todo || 0;
    const done = statusCounts.done || 0;
    const completionPercentage = total === 0 ? 0 : (done / total) * 100;

    return {
      total,
      statsCount: {
        todo,
        done,
        // Include all dynamically found statuses for extensibility
        ...statusCounts,
      },
      completionPercentage: Math.round(completionPercentage * 10) / 10,
    };
  },
};