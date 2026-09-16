import React, { useState } from 'react';
import { signInWithGoogle } from '../services/authService';
import { isFirebaseConfigured } from '../firebase/config';

export default function Login() {
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
      {/* Header / Navbar */}
      <header className="landing-navbar">
        <div className="navbar-brand">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <span className="brand-title">TaskFlow</span>
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Sign In
        </button>
      </header>

      {/* Main Hero Section */}
      <main className="landing-main">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
               TASKS
          </div>
          <h1 className="hero-title">
            Organize Tasks with <span className="title-highlight">Clarity & Speed</span>
          </h1>
          <p className="hero-description">
            TaskFlow is a streamlined task management app built with React and Firebase. Track your tasks seamlessly from Planned to Complete with real-time updates and strict user data privacy.
          </p>

          {!isFirebaseConfigured && (
            <div className="banner warning-banner hero-banner">
              <strong>Configuration Notice:</strong> Firebase credentials are using placeholder values. Please update your <code>.env</code> file or Vercel Environment Variables.
            </div>
          )}

          {error && (
            <div className="banner error-banner hero-banner">
              <span>{error}</span>
            </div>
          )}

          {/* Auth Card Callout */}
          <div className="cta-card">
            <h3 className="cta-card-title">Get Started in Seconds</h3>
            <p className="cta-card-subtitle">Sign in securely using your Google account to access your personal workspace.</p>
            
            <button
              id="google-signin-btn"
              className="google-btn hero-google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner dark-spinner"></span>
              ) : (
                <svg className="google-icon" width="22" height="22" viewBox="0 0 24 24">
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
              <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon icon-blue">⚡</div>
            <h3>Real-Time Sync</h3>
            <p>Instant Firestore sync ensures your task updates are reflected immediately across all active sessions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-emerald">🔒</div>
            <h3>User Data Isolation</h3>
            <p>Strict security rules guarantee that your task data is strictly private and accessible only to your account.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon icon-amber">📊</div>
            <h3>Status Lifecycle</h3>
            <p>Categorize tasks intuitively across <strong>Planned</strong>, <strong>In Progress</strong>, and <strong>Complete</strong> stages.</p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>Graduate Support Engineer Trainee Placement Assessment • Built with React, Vite & Firebase</p>
      </footer>
    </div>
  );
}
