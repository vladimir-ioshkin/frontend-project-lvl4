import React from 'react';
import filter from 'leo-profanity';
import { setI18n } from './i18n.js';
import { initSocket } from './socket.js';
import { App } from './components/App.jsx';

export const init = () => {
  setI18n();
  filter.loadDictionary('ru');

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };
  const actions = initSocket();

  return <App actions={actions} rollbarConfig={rollbarConfig} />;
};
