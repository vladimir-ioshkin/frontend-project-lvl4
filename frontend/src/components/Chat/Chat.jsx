import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import { pages } from '../../routes';
import getDataRequest from '../../store/thunks/getDataRequest';
import Channels from './Channels';
import Messages from './Messages';
import { AUTH_ERROR_CODE } from '../../constants';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { isLogged, logOut } = useContext(AuthorizationContext);

  const getData = useCallback(async () => {
    const { error } = await dispatch(getDataRequest());
    if (!error) {
      return;
    }

    if (error.message.includes(AUTH_ERROR_CODE)) {
      logOut();
      navigate(pages.login);
      return;
    }

    toast.error(t('errors.server'));
    rollbar.error(t('errors.server'), error);
  }, [dispatch, logOut, navigate, rollbar, t]);

  useEffect(() => {
    if (!isLogged) {
      logOut();
      navigate(pages.login);
      return;
    }
    getData();
  }, [isLogged, getData, logOut, navigate]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default Chat;
