import { createContext } from 'react';

const SocketContext = createContext({
  addMessageSocket: () => {},
  addChannelSocket: () => {},
  removeChannelSocket: () => {},
  renameChannelSocket: () => {},
});

export default SocketContext;
