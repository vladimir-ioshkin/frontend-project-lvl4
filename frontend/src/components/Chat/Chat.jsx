import { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { pages } from '../../routes.js';
import { selectors, getData } from '../../store/slices/channels.js';
import { Channels } from './Channels.jsx';
import { Messages } from './Messages.jsx';

export const Chat = () => {
  const { isLogged } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const [ currentChannel, setCurrentChannel ] = useState(null);

  useEffect(() => {
    if (!isLogged) {
      navigate(pages.login);
      return;
    }
    dispatch(getData());
  }, [isLogged, navigate, dispatch]);

  useEffect(() => {
    setCurrentChannel(channels[0]);
  }, [channels]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        {currentChannel && <Messages currentChannel={currentChannel} />}
      </Row>
    </Container>
  );
};
