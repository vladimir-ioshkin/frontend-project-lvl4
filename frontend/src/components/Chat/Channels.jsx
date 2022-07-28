import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';
import { ChannelItem } from './ChannelItem.jsx';
import { selectors } from '../../store/slices/channels.js';
import { openModal } from '../../store/slices/modal.js';

export const Channels = () => {
  const { t } = useTranslation();
  const { setCurrentChannelId } = useContext(CurrentChannelContext);
  const channels = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal({ action: 'add' }));
  };

  useEffect(() => {
    if (channels.length) {
      setCurrentChannelId(1);
    }
  }, [channels]);

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
