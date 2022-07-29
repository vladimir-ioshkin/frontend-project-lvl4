import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { initSocket } from '../socket.js';
import store from '../store/index.js';
import { i18n, setI18n } from '../i18n';
import { AuthorizationProvider } from '../providers/AuthorizationProvider.js';
import { Authorization } from './Authorization/Authorization.jsx';
import { Chat } from './Chat/Chat.jsx';
import { Header } from './Layout/Header.jsx';
import { NotFound } from './404/NotFound.jsx';
import { SignUp } from './SignUp/SignUp.jsx';
import { pages } from '../routes.js';
import { SocketProvider } from '../providers/SocketProvider.js';
import { CurrentChannelProvider } from '../providers/CurrentChannelProvider.js';

export const App = () => {
  setI18n();
  const actions = initSocket();
  const { login, chat, signup } = pages;

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider store={store}>
        <CurrentChannelProvider>
          <SocketProvider actions={actions}>
            <AuthorizationProvider>
              <BrowserRouter>
                <div className="d-flex flex-column h-100">
                  <Header />
                  <Routes>
                    <Route path={login} element={<Authorization />}></Route>
                    <Route path={chat} element={<Chat />}></Route>
                    <Route path={signup} element={<SignUp />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                  </Routes>
                </div>
              </BrowserRouter>
            </AuthorizationProvider>
          </SocketProvider>
        </CurrentChannelProvider>
      </StoreProvider>
    </I18nextProvider>
  );
};
