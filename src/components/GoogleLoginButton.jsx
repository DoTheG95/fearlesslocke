import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function GoogleLoginButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u));
  }, []);

  const handleLogin = () => signInWithPopup(auth, googleProvider);
  const handleLogout = () => signOut(auth);

  if (user) {
    return (
      <button onClick={handleLogout}>
        Sign out ({user.displayName})
      </button>
    );
  } else {
    return (
      <button onClick={handleLogin}>
        Sign in with Google
      </button>
    );
  }
}
