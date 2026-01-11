import React from 'react';
import './PrioritySelector.css';

function PrioritySelector({ value = 'medium', onChange }) {
  const priorities = [
    { value: 'high', color: '#ef4444' },
    { value: 'medium', color: '#f59e0b' },
    { value: 'low', color: '#10b981' }
  ];

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="priority-selector">
      <label htmlFor="priority" className="priority-label">
        Priority
      </label>
      <select
        id="priority"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="priority-select"
      >
        {priorities.map((priority) => (
          <option key={priority.value} value={priority.value}>
            {capitalize(priority.value)}
          </option>
        ))}
      </select>
      <div className="priority-preview">
        <span
          className="priority-indicator"
          style={{ backgroundColor: priorities.find(p => p.value === value)?.color }}
        />
        <span className="priority-text">
          {capitalize(value)} Priority
        </span>
      </div>
    </div>
  );
}

export default PrioritySelector;
