import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import ChatApiContext from '../../contexts/ChatApiContext';
import { RenameChannelModalProps } from './types';
import useValidationSchema from './useValidationSchema';

const RenameChannelModal: FunctionComponent<RenameChannelModalProps> = ({
  handleClose, isOpen, id, currentName,
}) => {
  const { t } = useTranslation();
  const { renameChannelSocket } = useContext(ChatApiContext);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputEl?.current?.focus();
      inputEl?.current?.select();
    }
  }, [isOpen]);

  const validationSchema = useValidationSchema();

  const onSubmit = async ({ name }, { resetForm, setSubmitting }) => {
    const callback = ({ status }) => {
      handleClose();
      resetForm();
      setSubmitting(false);

      if (status !== 'ok') {
        toast.error(t('errors.server'));
        return;
      }

      toast.success(t('modal.renameNotify'));
    };

    renameChannelSocket({ id, name: filter.clean(name.trim(), '*') }, callback);
  };

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t('modal.renameTitle')}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik
        initialValues={{ name: currentName }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <BootstrapModal.Body>
              <Form.Group className="mb-2 modal-input-block">
                <Form.Label htmlFor="name" className="visually-hidden">{t('modal.inputLabel')}</Form.Label>
                <Form.Control
                  ref={inputEl}
                  name="name"
                  id="name"
                  value={formik.values.name}
                  isInvalid={Boolean(formik.touched.name && formik.errors.name)}
                  onChange={formik.handleChange}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.name as string}</Form.Control.Feedback>
              </Form.Group>
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancelBtn')}</Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.renameBtn')}
              </Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameChannelModal;
