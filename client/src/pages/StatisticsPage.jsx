import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import StatisticsTitle from "../components/StatisticsTitle";
import TotalTasksCard from "../components/TotalTasksCard";
import TodoCard from "../components/TodoCard";
import DoneCard from "../components/DoneCard";
import CompletionRateCard from "../components/CompletionRateCard";

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
        <button className="add-btn" onClick={loadStatistics}>
          Retry
        </button>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  return (
    <div className="statistics-page">
      <StatisticsTitle />

      <div className="statistics-cards">
        <TotalTasksCard total={statistics.total} />
        <TodoCard count={statistics.statsCount.todo} />
        <DoneCard count={statistics.statsCount.done} />
        <CompletionRateCard percentage={statistics.completionPercentage} />
      </div>
    </div>
  );
}

export default StatisticsPage;
