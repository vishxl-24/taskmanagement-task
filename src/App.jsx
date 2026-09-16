import React, { useState, useEffect } from 'react';
import { subscribeToAuthState } from './services/authService';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  if (authChecking) {
    return (
      <div className="full-screen-loader">
        <div className="spinner large-spinner"></div>
        <p>Loading TaskFlow...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {user ? <Dashboard user={user} /> : <Login />}
    </div>
  );
}
