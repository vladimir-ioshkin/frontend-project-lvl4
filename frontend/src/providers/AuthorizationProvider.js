import React, { useState, useMemo } from 'react';
import AuthorizationContext from '../contexts/AuthorizationContext.js';

const AuthorizationProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('user')));

  const logIn = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setIsLogged(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
  };

  const getUsername = () => {
    const data = localStorage.getItem('user');
    if (!data) return '';
    const { username } = JSON.parse(data);
    return username;
  };

  const value = useMemo(() => ({
    isLogged,
    logIn,
    logOut,
    getUsername,
  }), [isLogged]);

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
