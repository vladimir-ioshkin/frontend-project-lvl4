import React, { useMemo } from 'react';
import ChatApiContext from '../contexts/ChatApiContext';

const ChatApiProvider = ({ actions, children }) => {
  const {
    addMessageSocket,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
  } = actions;

  const value = useMemo(() => ({
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
