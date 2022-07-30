import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Col, Nav } from 'react-bootstrap';
import { selectors, setDefaultChannel } from '../../store/slices/channels.js';
import { openModal } from '../../store/slices/modal.js';
import ChannelItem from './ChannelItem.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(selectors.selectAll);
  const handleClick = () => dispatch(openModal({ action: 'add' }));

  useEffect(() => {
    if (channels.length) {
      dispatch(setDefaultChannel());
    }
  }, [channels, dispatch]);

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <Button
          variant="outline-primary"
          className="p-0 rounded-1"
          style={{ width: '24px' }}
          size="sm"
          onClick={handleClick}
        >
          +
        </Button>
      </div>
      {Boolean(channels.length) && (
        <Nav fill variant="pills" as="ul" className="flex-column px-2">
          {channels.map(({ id, name, removable }) => (
            <ChannelItem name={name} key={id} removable={removable} id={id} />
          ))}
        </Nav>
      )}
    </Col>
  );
};

export default Channels;
