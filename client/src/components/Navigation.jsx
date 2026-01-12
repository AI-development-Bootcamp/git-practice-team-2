import React from 'react';

function Navigation({ currentPage, onPageChange }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-btn ${currentPage === 'tasks' ? 'active' : ''}`}
        onClick={() => onPageChange('tasks')}
      >
        Tasks
      </button>
      <button
        className={`nav-btn ${currentPage === 'statistics' ? 'active' : ''}`}
        onClick={() => onPageChange('statistics')}
      >
        Statistics
      </button>
    </nav>
  );
}

export default Navigation;
