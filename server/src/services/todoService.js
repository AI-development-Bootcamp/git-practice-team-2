import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '../data/todos.json');
const STATUS_FILE = join(__dirname, '../data/status.json');

function readTodos() {
  try {
    const data = readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function readStatuses() {
  try {
    const data = readFileSync(STATUS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Fallback to defaults if file is missing (though task required creating it)
    return ['todo', 'done', 'in_progress', 'review'];
  }
}

function validateStatus(status) {
  if (!status) return 'todo'; // Default

  const validStatuses = readStatuses();
  const normalizedStatus = status.toLowerCase();

  if (validStatuses.includes(normalizedStatus)) {
    return normalizedStatus;
  }

  const error = new Error(`Invalid status: ${status}. Allowed values: ${validStatuses.join(', ')}`);
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
    return todos.find(todo => todo.id === id);
  },

  create(todoData) {
    const todos = readTodos();
    const status = validateStatus(todoData.status);

    const newTodo = {
      id: crypto.randomUUID(),
      title: todoData.title,
      status: status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    todos.push(newTodo);
    writeTodos(todos);
    return newTodo;
  },

  update(id, updates) {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
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
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    writeTodos(todos);
    return true;
  }
};
