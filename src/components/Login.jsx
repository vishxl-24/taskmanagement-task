import React, { useState } from 'react';
import { signInWithGoogle } from '../services/authService';
import { isFirebaseConfigured } from '../firebase/config';

export default function Login({ theme, onToggleTheme }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    const { user, error: authError } = await signInWithGoogle();

    if (authError) {
      setError(authError);
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      {/* Landing Header */}
      <header className="landing-header">
        <div className="brand-logo">
          <div className="logo-icon small-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span className="brand-title-text">TaskFlow</span>
        </div>

        <div className="landing-header-actions">
          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="landing-hero">
        <div className="hero-badge">
          <span>Graduate Support Engineer Trainee Placement Assessment</span>
        </div>

        <h1 className="hero-title">
          Smart, Streamlined Task Management for Modern Workflows
        </h1>

        <p className="hero-description">
          Organize your tasks effortlessly. Track status changes in real-time across 
          <strong> Planned</strong>, <strong>In Progress</strong>, and <strong>Complete</strong> states with secure Google Authentication and user data isolation.
        </p>

        {!isFirebaseConfigured && (
          <div className="banner warning-banner hero-banner">
            <strong>Configuration Notice:</strong> Firebase API keys are using placeholder values. Add your credentials to <code>.env</code> file to connect your Firebase project.
          </div>
        )}

        {error && (
          <div className="banner error-banner hero-banner">
            <span>{error}</span>
          </div>
        )}

        {/* CTA Button */}
        <div className="hero-cta-group">
          <button
            id="google-signin-btn"
            className="google-btn hero-google-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>
        </div>

        {/* Feature Cards Grid */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon icon-blue">🔒</div>
            <h3>Google Authentication</h3>
            <p>Seamless 1-click popup authentication via Firebase Auth API.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-yellow">⚡</div>
            <h3>Color-Coded Statuses</h3>
            <p>Visual status cards for Planned (Blue), In Progress (Yellow), and Complete (Green).</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-green">🛡️</div>
            <h3>Isolated Data Storage</h3>
            <p>Strict Firestore security rules guarantee your tasks are private to your UID.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <p>TaskFlow Placement Assessment Application &copy; 2026</p>
      </footer>
    </div>
  );
}
