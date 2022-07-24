import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Form } from "react-bootstrap";


export const MessageForm = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { setSubmitting }) => {}
  });

  return (
    <Form noValidate className="py-1 border rounded-2">
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
        >
          &#10132;
        </Button>
      </div>
    </Form>
  );
};
