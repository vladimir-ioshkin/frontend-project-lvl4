import React, { useState, useMemo } from 'react';
import { AuthorizationContext } from '../contexts/AuthorizationContext.js';

export const AuthorizationProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('user'));

  const logIn = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setIsLogged(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
  };

  const value = useMemo(() => ({
    isLogged,
    logIn,
    logOut,
  }), [isLogged]);

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};
