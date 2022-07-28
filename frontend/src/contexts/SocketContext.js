import { createContext } from 'react';

export const SocketContext = createContext({
  addMessageSocket: () => {},
  addChannelSocket: () => {},
  removeChannelSocket: () => {},
  renameChannelSocket: () => {},
});
