import React, { useState, useEffect } from 'react';
import { signOutUser } from '../services/authService';
import { subscribeToUserTasks } from '../services/taskService';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import HelpModal from './HelpModal';

export default function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToUserTasks(
      user.uid,
      (fetchedTasks) => {
        setTasks(fetchedTasks);
        setLoading(false);
      },
      (errMessage) => {
        setError(errMessage);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  const handleLogout = async () => {
    setSigningOut(true);
    await signOutUser();
  };

  // Summary counts
  const plannedCount = tasks.filter((t) => t.status === 'Planned').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completeCount = tasks.filter((t) => t.status === 'Complete').length;

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="navbar-brand">
          <div className="logo-icon small-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span className="navbar-title">TaskFlow</span>
        </div>

        <div className="navbar-user">
          <button
            className="btn btn-outline btn-sm help-nav-btn"
            onClick={() => setShowHelpModal(true)}
            title="Help & Support"
          >
            <span className="help-question-mark">?</span>
            <span className="help-btn-text">Help & Support</span>
          </button>

          <div className="user-profile">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="user-avatar"
              />
            ) : (
              <div className="user-avatar-fallback">
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <span className="user-name">{user.displayName || user.email || 'User'}</span>
          </div>

          <button
            id="logout-btn"
            className="btn btn-outline btn-sm"
            onClick={handleLogout}
            disabled={signingOut}
          >
            {signingOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Summary Cards */}
        <section className="summary-section">
          <div className="summary-card planned-summary">
            <div className="summary-header">
              <span className="summary-dot planned-dot"></span>
              <span className="summary-title">Planned</span>
            </div>
            <div className="summary-count">{plannedCount}</div>
          </div>

          <div className="summary-card in-progress-summary">
            <div className="summary-header">
              <span className="summary-dot in-progress-dot"></span>
              <span className="summary-title">In Progress</span>
            </div>
            <div className="summary-count">{inProgressCount}</div>
          </div>

          <div className="summary-card complete-summary">
            <div className="summary-header">
              <span className="summary-dot complete-dot"></span>
              <span className="summary-title">Complete</span>
            </div>
            <div className="summary-count">{completeCount}</div>
          </div>
        </section>

        {/* Action Header */}
        <section className="dashboard-action-bar">
          <div>
            <h2 className="section-title">My Tasks</h2>
            <p className="section-subtitle">Manage and track your tasks</p>
          </div>
          <button
            id="create-task-btn"
            className="btn btn-primary"
            onClick={() => setShowTaskForm(true)}
          >
            + Create Task
          </button>
        </section>

        {/* Error Notification */}
        {error && (
          <div className="banner error-banner">
            <span>{error}</span>
          </div>
        )}

        {/* Loading / Empty / List State */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner large-spinner"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No tasks yet. Create your first task.</h3>
            <p>Get started by clicking "+ Create Task" above.</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowTaskForm(true)}
            >
              + Create Task
            </button>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </main>

      {/* Task Creation Modal */}
      {showTaskForm && (
        <TaskForm
          user={user}
          onClose={() => setShowTaskForm(false)}
        />
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
