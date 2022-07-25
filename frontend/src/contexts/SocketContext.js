import { createContext } from 'react';

export const SocketContext = createContext({
  sendMessage: () => {},
});
