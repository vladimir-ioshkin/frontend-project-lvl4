import React, { FunctionComponent } from 'react';
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
import ChatApiProvider from '../providers/ChatApiProvider';
import store from '../store/index';
import { Pages } from '../routes';
import { i18n } from '../i18n';
import Authorization from './Authorization/Authorization';
import Chat from './Chat/Chat';
import Header from './Layout/Header';
import NotFound from './404/NotFound';
import SignUp from './SignUp/SignUp';
import Modal from './Modal/Modal';
import { AppProps } from './types';

const App: FunctionComponent<AppProps> = ({ actions, rollbarConfig }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary errorMessage="Error in React render">
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={store}>
          <ChatApiProvider actions={actions}>
            <AuthorizationProvider>
              <BrowserRouter>
                <div className="d-flex flex-column h-100">
                  <Header />
                  <Routes>
                    <Route path={Pages.LOGIN} element={<Authorization />} />
                    <Route path={Pages.CHAT} element={<Chat />} />
                    <Route path={Pages.SIGNUP} element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <ToastContainer position="top-right" limit={3} />
                <Modal />
              </BrowserRouter>
            </AuthorizationProvider>
          </ChatApiProvider>
        </StoreProvider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
