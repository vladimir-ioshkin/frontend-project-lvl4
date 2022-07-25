import React from 'react';

export const MessageItem = ({ username, body }) => (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
);
