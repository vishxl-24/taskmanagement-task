import React, { useState } from 'react';
import { updateTaskStatus, ALLOWED_STATUSES } from '../services/taskService';

export default function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === status) return;

    setUpdating(true);
    setError(null);
    const oldStatus = status;
    setStatus(newStatus); // Optimistic UI update

    const result = await updateTaskStatus(task.id, newStatus);
    if (!result.success) {
      setStatus(oldStatus); // Revert on error
      setError(result.error || 'Failed to update status');
    }
    setUpdating(false);
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return 'Just now';
    try {
      const date = dateObj instanceof Date ? dateObj : new Date(dateObj);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getStatusCardClass = (statusStr) => {
    switch (statusStr) {
      case 'In Progress':
        return 'task-card-in-progress';
      case 'Complete':
        return 'task-card-complete';
      case 'Planned':
      default:
        return 'task-card-planned';
    }
  };

  const getStatusBadgeClass = (statusStr) => {
    switch (statusStr) {
      case 'In Progress':
        return 'badge badge-in-progress';
      case 'Complete':
        return 'badge badge-complete';
      case 'Planned':
      default:
        return 'badge badge-planned';
    }
  };

  return (
    <div className={`task-card ${getStatusCardClass(status)} ${updating ? 'task-card-updating' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={getStatusBadgeClass(status)}>{status}</span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {error && (
        <div className="card-error-inline">
          <small>{error}</small>
        </div>
      )}

      <div className="task-card-footer">
        <div className="status-selector-group">
          <label htmlFor={`status-select-${task.id}`} className="status-label">
            Status:
          </label>
          <select
            id={`status-select-${task.id}`}
            className="status-select"
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
          >
            {ALLOWED_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {updating && <span className="spinner micro-spinner"></span>}
        </div>

        <div className="task-meta">
          <span className="created-date">Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
