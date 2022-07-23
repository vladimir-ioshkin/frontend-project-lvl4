import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { AuthorizationProvider } from '../providers/AuthorizationProvider.js';
import { Authorization } from './Authorization.jsx';
import { Home } from './Home.jsx';
import { Header } from './Layout/Header.jsx';
import { Main } from './Layout/Main.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';

export const App = () => {
  return (
    <AuthorizationProvider>
      <div className="d-flex flex-column h-100">
        <Header />
        <Main>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Authorization />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </BrowserRouter>
        </Main>
      </div>
    </AuthorizationProvider>
  );
};
