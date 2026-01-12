import React, { useState, useRef, useEffect } from 'react';
import { STATUSES, VALID_STATUSES, STATUS_CONFIG } from '../constants/statuses';
import PriorityBadge from './PriorityBadge';

function TodoItem({ todo, onStatusChange, onDelete, onPriorityChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStatus = todo.status || STATUSES.TODO;
  const config = STATUS_CONFIG[currentStatus];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusSelect = (newStatus) => {
    if (newStatus !== currentStatus) {
      onStatusChange(todo.id, newStatus);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`todo-item todo-item-${currentStatus}`}
      data-priority={todo.priority || 'medium'}
    >
      <PriorityBadge
        priority={todo.priority || 'medium'}
        onChange={(newPriority) => onPriorityChange(todo.id, newPriority)}
      />

      <span className="todo-title">{todo.title}</span>

      <div className="status-dropdown" ref={dropdownRef}>
        <button
          className="status-badge"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Status: ${config.label}. Click to change.`}
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
            borderColor: config.color
          }}
        >
          <span className="status-icon">{config.icon}</span>
          <span className="status-label">{config.label}</span>
          <span className="dropdown-arrow">▾</span>
        </button>

        {isOpen && (
          <ul className="status-options" role="listbox">
            {VALID_STATUSES.map(status => (
              <li
                key={status}
                role="option"
                aria-selected={status === currentStatus}
                className={`status-option ${status === currentStatus ? 'selected' : ''}`}
                onClick={() => handleStatusSelect(status)}
              >
                {STATUS_CONFIG[status].label}
              </li>
            ))}
          </ul>
        )}
      </div>

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