import React from 'react';
import PriorityBadge from './PriorityBadge';

function TodoItem({ todo, onToggle, onDelete, onPriorityChange }) {
  return (
    <div
      className={`todo-item ${todo.status === 'done' ? 'done' : ''}`}
      data-priority={todo.priority || 'medium'}
    >
      <button
        className="toggle-btn"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.status === 'done' ? 'Mark as pending' : 'Mark as done'}
      >
        {todo.status === 'done' ? '✓' : '○'}
      </button>

      <PriorityBadge
        priority={todo.priority || 'medium'}
        onChange={(newPriority) => onPriorityChange(todo.id, newPriority)}
      />

      <span className="todo-title">{todo.title}</span>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
