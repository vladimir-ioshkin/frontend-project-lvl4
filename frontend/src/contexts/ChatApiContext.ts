import { createContext } from 'react';
import { ISocketActions } from '../components/types';

const ChatApiContext = createContext({
  addMessageSocket: () => {},
  addChannelSocket: () => {},
  removeChannelSocket: () => {},
  renameChannelSocket: () => {},
} as ISocketActions);

export default ChatApiContext;
