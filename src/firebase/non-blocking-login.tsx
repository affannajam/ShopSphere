'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  // We chain a .catch() to handle specific authentication errors.
  signInWithEmailAndPassword(authInstance, email, password)
    .catch(error => {
        // The onAuthStateChanged listener's error callback is for the listener itself,
        // not for sign-in failures. We catch the sign-in promise rejection here.
        // We can now pass this error to our global state or an error handler component.
        // For this example, we'll just log it, but in a real app you'd update state.
        console.error("Sign-in failed:", error);
        // This is where you would set an error state to be displayed in the UI
    });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
