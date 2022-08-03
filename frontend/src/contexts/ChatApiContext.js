import { createContext } from 'react';

const ChatApiContext = createContext({
  addMessageSocket: () => {},
  addChannelSocket: () => {},
  removeChannelSocket: () => {},
  renameChannelSocket: () => {},
});

export default ChatApiContext;
