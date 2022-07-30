import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { AuthorizationProvider } from '../providers/AuthorizationProvider.js';
import { SocketProvider } from '../providers/SocketProvider.js';
import store from '../store/index.js';
import { pages } from '../routes.js';
import { i18n } from '../i18n.js';
import { Authorization } from './Authorization/Authorization.jsx';
import { Chat } from './Chat/Chat.jsx';
import { Header } from './Layout/Header.jsx';
import { NotFound } from './404/NotFound.jsx';
import { SignUp } from './SignUp/SignUp.jsx';
import { Modal } from './Chat/Modal.jsx';

export const App = ({ actions, rollbarConfig }) => {
  const { login, chat, signup } = pages;

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary errorMessage="Error in React render">
        <I18nextProvider i18n={i18n}>
          <StoreProvider store={store}>
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
                  <ToastContainer position="top-right" limit={3} />
                  <Modal />
                </BrowserRouter>
              </AuthorizationProvider>
            </SocketProvider>
          </StoreProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
