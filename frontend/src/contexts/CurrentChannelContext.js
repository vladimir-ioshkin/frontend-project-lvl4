import { createContext } from 'react';

export const CurrentChannelContext = createContext({
  currentChannelId: null,
  setCurrentChannelId: () => {},
});
