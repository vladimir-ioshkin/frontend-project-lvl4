import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import AuthorizationContext from '../../contexts/AuthorizationContext.js';
import { pages } from '../../routes.js';
import { getDataRequest } from '../../store/thunks/index.js';
import { errorCodeSelector, errorSelector } from '../../store/slices/applicationStatus';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { AUTH_ERROR_CODE } from '../../constants.js';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { isLogged, logOut } = useContext(AuthorizationContext);
  const errorCode = useSelector(errorCodeSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (!isLogged) {
      logOut();
      navigate(pages.login);
      return;
    }

    dispatch(getDataRequest());
  }, [isLogged, dispatch, logOut, navigate]);

  useEffect(() => {
    if (!errorCode) return;

    if (errorCode === AUTH_ERROR_CODE) {
      logOut();
      navigate(pages.login);
      return;
    }

    toast.error(t(errorCode));
    rollbar.error(t(errorCode), error);
  }, [errorCode, error, logOut, navigate, rollbar, t]);

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
