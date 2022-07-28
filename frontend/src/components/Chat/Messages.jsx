import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesByChannelIdSelector } from '../../store/slices/messages.js';
import { MessageItem } from './MessageItem.jsx';
import { MessageForm } from './MessageForm.jsx';
import { selectors } from '../../store/slices/channels.js';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';

export const Messages = () => {
  const { currentChannelId } = useContext(CurrentChannelContext);
  const messages = useSelector(messagesByChannelIdSelector(currentChannelId));
  const currentChannel = useSelector((state) => selectors.selectById(state, currentChannelId));
  const { t } = useTranslation();

  if (!currentChannel) {
    return null;
  }

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel.name}`}</b>
          </p>
          <span>{`${t('chat.messages.key', { count: messages.length })}`}</span>
        </div>
        {Boolean(messages.length) && (
          <div className="overflow-auto px-5">
            {messages.map(({ id, username, body }) => (
              <MessageItem key={id} username={username} body={body} />
            ))}
          </div>
        )}
        <div className="mt-auto px-5 py-3">
          <MessageForm currentChannelId={currentChannelId} />
        </div>
      </div>
    </Col>
  );
};