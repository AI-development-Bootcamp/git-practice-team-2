import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function StatisticsPage() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await api.statistics.getAll();
      setStatistics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      alert(`Error loading statistics: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return (
      <div className="empty-state">
        <p>Failed to load statistics. Please try again.</p>
        <button className="add-btn" onClick={loadStatistics}>Retry</button>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="statistics-page">
      <h2 className="statistics-title">Task Statistics</h2>

      <div className="statistics-cards">
        <div className="stat-card">
          <div className="stat-value">{statistics.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{statistics.statsCount.todo}</div>
          <div className="stat-label">To Do</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{statistics.statsCount.done}</div>
          <div className="stat-label">Done</div>
        </div>

        <div className="stat-card stat-card-highlight">
          <div className="stat-value">{statistics.completionPercentage.toFixed(1)}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
