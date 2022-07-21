import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Home } from './Home.jsx';
import { Login } from './Login.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
