import React, { useMemo, useState } from 'react';
import { CurrentChannelContext } from '../contexts/CurrentChannelContext.js';

const DEFAULT_CHANNEL_ID = 1;

export const CurrentChannelProvider = ({ children }) => {
  const [currentChannelId, setCurrentChannelId] = useState(null);

  const setDefaultChannel = () => setCurrentChannelId(DEFAULT_CHANNEL_ID);

  const value = useMemo(() => ({
    currentChannelId,
    setCurrentChannelId,
    setDefaultChannel,
  }), [currentChannelId, setCurrentChannelId, setDefaultChannel]);

  return (
    <CurrentChannelContext.Provider value={value}>
      {children}
    </CurrentChannelContext.Provider>
  );
};
