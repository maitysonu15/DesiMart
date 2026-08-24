import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { showToast } = useToast();

  const [users, setUsers] = useState([
    { name: 'Demo User', email: 'user@desimart.com', password: 'password123', mobile: '9876543210' }
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const login = (emailOrMobile, password) => {
    const cleanIdentifier = emailOrMobile.trim().toLowerCase();
    const match = users.find(
      (u) => (u.email === cleanIdentifier || u.mobile === cleanIdentifier) && u.password === password
    );

    if (match) {
      setCurrentUser(match);
      const firstName = match.name.split(' ')[0];
      showToast(`Welcome back, ${firstName}!`, 'success');
      return true;
    } else {
      showToast('Enter your valid password.', 'error');
      return false;
    }
  };

  const register = (name, email, password, mobile = '') => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = users.some((u) => u.email === cleanEmail);

    if (exists) {
      showToast('An account with this email already exists.', 'error');
      return false;
    }

    const newUser = { name: name.trim(), email: cleanEmail, password, mobile };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome to DesiMart, ${name.trim().split(' ')[0]}! Account created.`, 'success');
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
