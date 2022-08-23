import React, { ReactNode, useMemo } from 'react';
import { ISocketActions } from '../components/types';
import ChatApiContext from '../contexts/ChatApiContext';

const ChatApiProvider = ({ actions, children }: {
  actions: ISocketActions;
  children: ReactNode;
}) => {
  const {
    addMessageSocket,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
  } = actions;

  const value: ISocketActions = useMemo(() => ({
    addMessageSocket,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
  }), [
    addMessageSocket,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
  ]);

  return (
    <ChatApiContext.Provider value={value}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
