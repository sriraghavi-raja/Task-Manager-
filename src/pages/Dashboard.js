import React from 'react';
import Board from '../components/Board';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <Board />
    </div>
  );
}