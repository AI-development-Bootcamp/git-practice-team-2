import React, { useState, useRef, useEffect } from 'react';
import './PriorityBadge.css';
import { PRIORITY_COLORS } from '../constants/priorities';

function PriorityBadge({ priority, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const priorities = [
    { value: 'high', color: PRIORITY_COLORS.HIGH, label: 'High' },
    { value: 'medium', color: PRIORITY_COLORS.MEDIUM, label: 'Medium' },
    { value: 'low', color: PRIORITY_COLORS.LOW, label: 'Low' }
  ];

  const currentPriority = priorities.find(p => p.value === priority) || priorities[1];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handlePriorityChange = (newPriority) => {
    onChange(newPriority);
    setIsOpen(false);
  };

  return (
    <div className="priority-badge-container" ref={dropdownRef}>
      <span
        className="priority-badge"
        style={{ backgroundColor: currentPriority.color }}
        onClick={() => setIsOpen(!isOpen)}
        title={`Priority: ${currentPriority.label} (click to change)`}
      />

      {isOpen && (
        <div className="priority-dropdown">
          {priorities.map((p) => (
            <button
              key={p.value}
              className={`priority-option ${p.value === priority ? 'active' : ''}`}
              onClick={() => handlePriorityChange(p.value)}
            >
              <span
                className="priority-option-badge"
                style={{ backgroundColor: p.color }}
              />
              <span className="priority-option-label">{p.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriorityBadge;
