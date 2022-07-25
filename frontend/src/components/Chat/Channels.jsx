import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ChannelItem } from './ChannelItem.jsx';
import { selectors } from '../../store/slices/channels.js';

export const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('chat.channels')}</span>
        <Button
          variant="outline-primary"
          className="p-0 rounded-1"
          style={{ width: '24px' }}
          size="sm"
        >
          +
        </Button>
      </div>
      {Boolean(channels.length) && (
        <Nav fill variant="pills" as="ul" className="flex-column px-2">
          {channels.map(({ id, name }) => (
            <ChannelItem name={name} key={id} />
          ))}
        </Nav>
      )}
    </Col>
  );
};
