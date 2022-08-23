import React from 'react';
import filter from 'leo-profanity';
import { Socket } from 'socket.io-client';
import { setI18n } from './i18n';
import initSocket from './socket';
import App from './components/App';
import { IRollbarConfig, ISocketActions } from './components/types';

const init = ({ socket }: { socket: Socket }) => {
  setI18n();
  filter.loadDictionary('ru');

  const rollbarConfig: IRollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };
  const actions: ISocketActions = initSocket(socket);

  return <App actions={actions} rollbarConfig={rollbarConfig} />;
};

export default init;
