import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import TodoList from "../components/TodoList";
import AddTodoModal from "../components/AddTodoModal";
import "../styles/TasksPage.css";

function TasksPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await api.todos.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todoData) => {
    try {
      const newTodo = await api.todos.create(todoData);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await api.todos.update(id, { status: newStatus });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.todos.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePriorityChange = async (id, priority) => {
    try {
      const updated = await api.todos.update(id, { priority });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button className="add-todo-btn" onClick={() => setIsModalOpen(true)}>
        + Add New Task
      </button>

      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>x</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onPriorityChange={handlePriorityChange}
        />
      )}
    </>
  );
}

export default TasksPage;
