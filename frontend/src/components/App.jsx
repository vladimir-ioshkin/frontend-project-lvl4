import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import store from '../store/index.js';
import { i18n, setI18n } from '../i18n';
import { I18nextProvider } from 'react-i18next';
import { AuthorizationProvider } from '../providers/AuthorizationProvider.js';
import { Authorization } from './Authorization/Authorization.jsx';
import { Chat } from './Chat/Chat.jsx';
import { Header } from './Layout/Header.jsx';
import { NotFound } from './404/NotFound.jsx';

export const App = () => {
  setI18n();

  return (
    <I18nextProvider i18n={i18n}>
      <StoreProvider store={store}>
        <AuthorizationProvider>
          <div className="d-flex flex-column h-100">
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Authorization />}></Route>
                <Route path="/" element={<Chat />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </AuthorizationProvider>
      </StoreProvider>
    </I18nextProvider>
  );
};
