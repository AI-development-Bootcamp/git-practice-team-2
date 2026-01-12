import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Navigation from "./Navigation";
import StatisticsPage from "./StatisticsPage";
import AddTodoModal from "./AddTodoModal";
import "../App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("tasks");
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    <div className="app">
      <header className="header">
        <h1>Todo App</h1>
      </header>

      <div className="app-content">
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />

        <main className="main">
          {currentPage === "tasks" ? (
            <>
              <button
                className="add-todo-btn"
                onClick={() => setIsModalOpen(true)}
              >
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
                  onToggle={handleStatusChange}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onPriorityChange={handlePriorityChange}
                />
              )}
            </>
          ) : (
            <StatisticsPage />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
