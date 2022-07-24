export const MessageItem = ({ username, body }) => {
return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};
