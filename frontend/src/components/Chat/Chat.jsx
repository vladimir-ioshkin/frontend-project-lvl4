import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';
import { pages } from '../../routes.js';
import { getData } from '../../store/slices/channels.js';
import { Channels } from './Channels.jsx';
import { Messages } from './Messages.jsx';
import { Modal } from './Modal.jsx';

export const Chat = () => {
  const { isLogged } = useContext(AuthorizationContext);
  const { currentChannelId } = useContext(CurrentChannelContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      navigate(pages.login);
      return;
    }
    dispatch(getData());
  }, [isLogged]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        {currentChannelId && <Messages />}
      </Row>
      <Modal />
    </Container>
  );
};
