import React, { useState } from 'react';
import { createTask, MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../services/taskService';

export default function TaskForm({ user, onClose, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title is required.');
      return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError(`Title cannot exceed ${MAX_TITLE_LENGTH} characters.`);
      return;
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setError(`Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`);
      return;
    }

    setSubmitting(true);
    const result = await createTask(user.uid, { title: trimmedTitle, description });

    if (result.success) {
      if (onTaskCreated) onTaskCreated();
      onClose();
    } else {
      setError(result.error || 'Failed to create task.');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close form">
            &times;
          </button>
        </div>

        {error && (
          <div className="banner error-banner">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task-title">
              Task Title <span className="required">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Build authentication flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={MAX_TITLE_LENGTH}
              disabled={submitting}
              autoFocus
            />
            <small className="char-count">
              {title.length}/{MAX_TITLE_LENGTH}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="task-description">Description (Optional)</label>
            <textarea
              id="task-description"
              rows="4"
              placeholder="Add details, notes, or subtasks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={MAX_DESCRIPTION_LENGTH}
              disabled={submitting}
            ></textarea>
            <small className="char-count">
              {description.length}/{MAX_DESCRIPTION_LENGTH}
            </small>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              id="submit-task-btn"
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner small-spinner"></span>
                  <span>Creating...</span>
                </>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
