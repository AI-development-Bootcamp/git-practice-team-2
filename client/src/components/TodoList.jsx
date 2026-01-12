import React from 'react';
import TodoItem from './TodoItem';
import { STATUSES, STATUS_CONFIG, validateStatus } from '../constants/statuses';

function TodoList({ todos, onStatusChange, onDelete,onPriorityChange }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  // Group todos by status
  const todosByStatus = {
    [STATUSES.TODO]: [],
    [STATUSES.IN_PROGRESS]: [],
    [STATUSES.REVIEW]: [],
    [STATUSES.DONE]: []
  };

  todos.forEach(todo => {
    const status = validateStatus(todo.status);
    todosByStatus[status].push(todo);
  });

  // Render order
  const statusOrder = [STATUSES.TODO, STATUSES.IN_PROGRESS, STATUSES.REVIEW, STATUSES.DONE];

  return (
    <div className="todo-list">
      {statusOrder.map(status => {
        const statusTodos = todosByStatus[status];
        if (statusTodos.length === 0) return null;

        const config = STATUS_CONFIG[status];

        return (
          <section key={status} className="todo-section">
            <h2>{config.label} ({statusTodos.length})</h2>
            {statusTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onPriorityChange={onPriorityChange}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default TodoList;
