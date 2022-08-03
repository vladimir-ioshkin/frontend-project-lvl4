import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import ChatApiContext from '../../contexts/ChatApiContext';
import { currentChannelIdSelector } from '../../store/slices/channels';

const MessageForm = () => {
  const { t } = useTranslation();
  const { addMessageSocket } = useContext(ChatApiContext);
  const { getUsername } = useContext(AuthorizationContext);
  const currentChannelId = useSelector(currentChannelIdSelector);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async ({ body }, { resetForm, setSubmitting }) => {
      const callback = () => {
        resetForm();
        setSubmitting(false);
      };
      addMessageSocket({
        body: filter.clean(body.trim(), '*'),
        channelId: currentChannelId,
        username: getUsername(),
      }, callback);
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
          aria-label={t('chat.messages.label')}
        />
        <Button
          type="submit"
          className="p-0 rounded-1 mx-2"
          variant="outline-secondary"
          size="sm"
          style={{ width: '24px' }}
          disabled={!formik.values.body || formik.isSubmitting}
        >
          &#10132;
        </Button>
      </div>
    </Form>
  );
};

export default MessageForm;
