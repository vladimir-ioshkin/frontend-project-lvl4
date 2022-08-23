import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import { Pages } from '../../routes';
import getDataRequest from '../../store/thunks/getDataRequest';
import Channels from './Channels';
import Messages from './Messages';
import { ErrorCodes } from '../../types';
import { AppDispatch } from '../../store';
import { IAuthorizationValue } from '../../providers/types';

const Chat: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { isLogged, logOut } = useContext<IAuthorizationValue>(AuthorizationContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    const result = await dispatch(getDataRequest());
    setIsLoading(false);

    if (getDataRequest.rejected.match(result)) {
      const { error } = result;
      if (error.message.includes(ErrorCodes.AUTH)) {
        logOut();
        navigate(Pages.LOGIN);
        return;
      }

      toast.error(t('errors.server'));
      rollbar.error(t('errors.server'), error);
    }
  }, [dispatch, logOut, navigate, rollbar, t]);

  useEffect(() => {
    if (!isLogged) {
      logOut();
      navigate(Pages.LOGIN);
      return;
    }
    getData();
  }, [isLogged, getData, logOut, navigate]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {!isLoading && (
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      )}
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center h-100">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default Chat;
