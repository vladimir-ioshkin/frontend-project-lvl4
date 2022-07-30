import React, { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ actions, children }) => {
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
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
