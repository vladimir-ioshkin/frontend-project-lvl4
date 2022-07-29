import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { pages } from '../../routes.js';
import { getDataRequest } from '../../store/thunks/index.js';
import { errorCodeSelector } from '../../store/slices/applicationStatus';
import { Channels } from './Channels.jsx';
import { Messages } from './Messages.jsx';
import { Modal } from './Modal.jsx';
import { AUTH_ERROR_CODE } from '../../constants.js';

export const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, logOut } = useContext(AuthorizationContext);
  const errorCode = useSelector(errorCodeSelector);

  useEffect(() => {
    if (!isLogged || errorCode === AUTH_ERROR_CODE) {
      logOut();
      navigate(pages.login);
      return;
    }

    dispatch(getDataRequest());
  }, [isLogged]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      <Modal />
    </Container>
  );
};
