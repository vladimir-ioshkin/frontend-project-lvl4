import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { currentChannelMessagesSelector } from '../../store/slices/messages';
import { currentChannelSelector } from '../../store/slices/channels';
import MessageItem from './MessageItem';
import MessageForm from './MessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const messages = useSelector(currentChannelMessagesSelector);
  const currentChannel = useSelector(currentChannelSelector);

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
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
