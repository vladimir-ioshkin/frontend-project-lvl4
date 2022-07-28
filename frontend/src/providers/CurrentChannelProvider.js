import React, { useMemo, useState } from 'react';
import { CurrentChannelContext } from '../contexts/CurrentChannelContext.js';

export const CurrentChannelProvider = ({ children }) => {
  const [currentChannelId, setCurrentChannelId] = useState(null);

  const value = useMemo(() => ({
    currentChannelId,
    setCurrentChannelId,
  }), [currentChannelId, setCurrentChannelId]);

  return (
    <CurrentChannelContext.Provider value={value}>
      {children}
    </CurrentChannelContext.Provider>
  );
};
