import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationContext } from '../contexts/AuthorizationContext.js';
import { pages } from '../routes.js';


export const Home = () => {
  const { isLogged } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate(pages.login);
    }
  }, [isLogged, navigate]);

  return null;
};
