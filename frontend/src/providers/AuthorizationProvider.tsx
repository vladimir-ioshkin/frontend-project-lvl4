import React, { useState, useMemo, ReactNode } from 'react';
import AuthorizationContext from '../contexts/AuthorizationContext';
import {
  GetUsernameType,
  IAuthorizationValue,
  LogInType,
  LogOutType,
} from './types';

const AuthorizationProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>(Boolean(localStorage.getItem('user')));

  const logIn: LogInType = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setIsLogged(true);
  };

  const logOut: LogOutType = () => {
    localStorage.removeItem('user');
    setIsLogged(false);
  };

  const getUsername: GetUsernameType = () => {
    const data = localStorage.getItem('user');
    if (!data) return '';
    const { username } = JSON.parse(data);
    return username;
  };

  const value: IAuthorizationValue = useMemo(() => ({
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
