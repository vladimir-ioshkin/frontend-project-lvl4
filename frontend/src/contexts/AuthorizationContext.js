import { createContext } from 'react';

const AuthorizationContext = createContext({
  isLogged: false,
  logIn: () => {},
  logOut: () => {},
  getUsername: () => {},
});

export default AuthorizationContext;
