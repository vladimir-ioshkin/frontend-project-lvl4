import React from 'react';
import filter from 'leo-profanity';
import { setI18n } from './i18n';
import initSocket from './socket';
import App from './components/App';

const init = ({ socket }) => {
  setI18n();
  filter.loadDictionary('ru');

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };
  const actions = initSocket(socket);

  return <App actions={actions} rollbarConfig={rollbarConfig} />;
};

export default init;
