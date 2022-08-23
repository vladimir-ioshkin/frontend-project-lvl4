import React, { FunctionComponent } from 'react';
import { MessageItemProps } from './types';

const MessageItem: FunctionComponent<MessageItemProps> = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {`:  ${body}`}
  </div>
);

export default MessageItem;
