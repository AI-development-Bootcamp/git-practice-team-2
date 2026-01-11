import React, { useState } from 'react';
import PrioritySelector from './PrioritySelector';
import './AddTodoModal.css';

function AddTodoModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title: title.trim(), priority });
      setTitle('');
      setPriority('medium');
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="modal-input"
              autoFocus
            />
          </div>

          <PrioritySelector value={priority} onChange={setPriority} />

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={!title.trim()}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTodoModal;
