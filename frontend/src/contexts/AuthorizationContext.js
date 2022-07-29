import { createContext } from 'react';

export const AuthorizationContext = createContext({
  isLogged: false,
  logIn: () => {},
  logOut: () => {},
  getUsername: () => {},
});
