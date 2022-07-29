import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';

export const Header = () => {
  const { t } = useTranslation();
  const { isLogged, logOut } = useContext(AuthorizationContext);

  const handleClick = () => {
    logOut();
  };

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {isLogged && <Button onClick={handleClick}>{t('header.unAuthorize')}</Button>}
      </Container>
    </Navbar>
  );
};
