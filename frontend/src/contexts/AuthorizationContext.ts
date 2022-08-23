import { createContext } from 'react';
import { IAuthorizationValue } from '../providers/types';

const AuthorizationContext = createContext({
  isLogged: false,
  logIn: () => {},
  logOut: () => {},
  getUsername: () => '',
} as IAuthorizationValue);

export default AuthorizationContext;
