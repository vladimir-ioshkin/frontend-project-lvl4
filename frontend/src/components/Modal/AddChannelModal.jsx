import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import useValidationSchema from './useValidationSchema';
import ChatApiContext from '../../contexts/ChatApiContext';
import { setCurrentChannelId } from '../../store/slices/channels';

const AddChannelModal = ({ handleClose, isOpen }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addChannelSocket } = useContext(ChatApiContext);
  const inputEl = useRef();

  useEffect(() => {
    if (isOpen && inputEl?.current) {
      inputEl.current.focus();
    }
  }, [isOpen]);

  const validationSchema = useValidationSchema();

  const onSubmit = async ({ name }, { resetForm, setSubmitting }) => {
    const callback = ({ data, status }) => {
      handleClose();
      resetForm();
      setSubmitting(false);

      if (status !== 'ok') {
        toast.error(t('errors.server'));
        return;
      }

      toast.success(t('modal.addNotify'));
      dispatch(setCurrentChannelId({ id: data.id }));
    };

    addChannelSocket({ name: filter.clean(name.trim(), '*') }, callback);
  };

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t('modal.addTitle')}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik
        initialValues={{ name: '' }}
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
                  isInvalid={formik.touched.name && formik.errors.name}
                  onChange={formik.handleChange}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
              </Form.Group>
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancelBtn')}</Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.addBtn')}
              </Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddChannelModal;
