import React, { useMemo } from 'react';
import { SocketContext } from '../contexts/SocketContext.js';

export const SocketProvider = ({ actions, children }) => {
  const {
    sendMessage,
  } = actions;

  const value = useMemo(() => ({
    sendMessage,
  }), [sendMessage]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
