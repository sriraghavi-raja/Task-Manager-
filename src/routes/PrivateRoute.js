import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/" replace />;
}