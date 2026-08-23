import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { showToast } = useToast();

  const [users, setUsers] = useState([
    { name: 'Demo User', email: 'user@desimart.com', password: 'password123' }
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const match = users.find((u) => u.email === cleanEmail && u.password === password);

    if (match) {
      setCurrentUser(match);
      const firstName = match.name.split(' ')[0];
      showToast(`Welcome back, ${firstName}!`, 'success');
      return true;
    } else {
      showToast('Invalid email or password.', 'error');
      return false;
    }
  };

  const register = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email === cleanEmail);

    if (exists) {
      showToast('An account with this email already exists.', 'error');
      return false;
    }

    const newUser = { name: name.trim(), email: cleanEmail, password };
    setUsers((prev) => [...prev, newUser]);
    showToast('Account created successfully! Please log in.', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', '');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
