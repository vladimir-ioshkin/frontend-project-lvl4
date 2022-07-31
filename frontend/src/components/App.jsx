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
import AuthorizationProvider from '../providers/AuthorizationProvider';
import SocketProvider from '../providers/SocketProvider';
import store from '../store/index';
import { pages } from '../routes';
import { i18n } from '../i18n';
import Authorization from './Authorization/Authorization';
import Chat from './Chat/Chat';
import Header from './Layout/Header';
import NotFound from './404/NotFound';
import SignUp from './SignUp/SignUp';
import Modal from './Modal/Modal';

const App = ({ actions, rollbarConfig }) => {
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
                      <Route path={login} element={<Authorization />} />
                      <Route path={chat} element={<Chat />} />
                      <Route path={signup} element={<SignUp />} />
                      <Route path="*" element={<NotFound />} />
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

export default App;
