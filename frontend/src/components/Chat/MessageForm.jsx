import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { SocketContext } from '../../contexts/SocketContext.js';

export const MessageForm = ({ currentChannelId }) => {
  const { t } = useTranslation();
  const { sendMessage } = useContext(SocketContext);
  const { getUsername } = useContext(AuthorizationContext);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm }) => {
      sendMessage({
        body: body.trim(),
        channelId: currentChannelId,
        username: getUsername(),
      }, resetForm);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <Form.Control
          className="border-0 p-0 ps-2"
          placeholder={t('chat.messages.placeholder')}
          name="body"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <Button
          type="submit"
          className="p-0 rounded-1 mx-2"
          variant="outline-secondary"
          size="sm"
          style={{ width: '24px' }}
          disabled={!formik.values.body}
        >
          &#10132;
        </Button>
      </div>
    </Form>
  );
};
