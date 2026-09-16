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
    <div className="login-container">
      <div className="login-card">
        <div className="brand-logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1 className="brand-title">TaskFlow</h1>
        </div>
        <p className="brand-subtitle">Simple & Secure Task Management</p>

        {!isFirebaseConfigured && (
          <div className="banner warning-banner">
            <strong>Configuration Notice:</strong> Firebase API keys are using placeholder values. Add your credentials to <code>.env</code> file to connect your Firebase project.
          </div>
        )}

        {error && (
          <div className="banner error-banner">
            <span>{error}</span>
          </div>
        )}

        <button
          id="google-signin-btn"
          className="google-btn"
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

        <p className="login-footer">Placement Assessment | Graduate Support Engineer Trainee</p>
      </div>
    </div>
  );
}
