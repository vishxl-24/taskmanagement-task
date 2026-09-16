import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

/**
 * Sign in using Google Auth Popup
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.error('Error during Google sign in:', error);
    let errorMessage = 'Failed to sign in with Google. Please try again.';
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign-in popup was closed before completing.';
    } else if (error.code === 'auth/cancelled-popup-request') {
      errorMessage = 'Sign-in popup request was cancelled.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Network error during sign in. Please check your internet connection.';
    } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/unauthorized-domain') {
      errorMessage = 'Firebase auth is not properly configured. Check your .env file and Firebase Console settings.';
    }
    return { user: null, error: errorMessage };
  }
};

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Failed to sign out. Please try again.' };
  }
};

/**
 * Subscribe to Auth State Changes
 * @param {Function} callback Callback receiving user object or null
 * @returns {Function} Unsubscribe function
 */
export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
