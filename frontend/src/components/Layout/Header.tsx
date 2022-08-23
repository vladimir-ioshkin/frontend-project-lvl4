import React, { FunctionComponent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Navbar } from 'react-bootstrap';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import { IAuthorizationValue } from '../../providers/types';

const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isLogged, logOut } = useContext<IAuthorizationValue>(AuthorizationContext);

  return (
    <Navbar expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {isLogged && <Button onClick={logOut}>{t('header.unAuthorize')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;
