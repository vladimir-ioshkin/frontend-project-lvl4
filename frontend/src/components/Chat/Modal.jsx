import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { SocketContext } from '../../contexts/SocketContext.js';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';
import { selectors } from '../../store/slices/channels.js';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal.js';

export const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addChannelSocket, removeChannelSocket, renameChannelSocket } = useContext(SocketContext);
  const { setCurrentChannelId } = useContext(CurrentChannelContext);
  const isOpen = useSelector(modalIsOpenSelector);
  const { action, id, name: currentName } = useSelector(modalChannelSelector);
  const channels = useSelector(selectors.selectAll);
  const inputEl = useRef();

  useEffect(() => {
    if (isOpen && inputEl?.current && action !== 'remove') {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [isOpen, action]);

  const handleClose = () => dispatch(closeModal());

  const schema = yup.object({
    name: yup.string()
      .required(t('modal.requiredError'))
      .notOneOf(channels.map(({ name }) => name), t('modal.existError')),
  });

  const config = {
    add: {
      title: t('modal.addTitle'),
      btnText: t('modal.addBtn'),
      btnVariant: 'primary',
      formProps: {
        initialValues: { name: '' },
        validationSchema: schema,
        onSubmit: async ({ name }, { resetForm, setSubmitting }) => {
          const callback = ({ data }) => {
            toast.success(t('modal.addNotify'));
            handleClose();
            setCurrentChannelId(data.id);
            resetForm();
            setSubmitting(false);
          };
          addChannelSocket({ name: filter.clean(name.trim(), '*') }, callback);
        },
      },
    },
    remove: {
      title: t('modal.removeTitle'),
      btnText: t('modal.removeBtn'),
      btnVariant: 'danger',
      formProps: {
        initialValues: {},
        onSubmit: async (_, { setSubmitting }) => {
          const callback = () => {
            toast.success(t('modal.removeNotify'));
            handleClose();
            setSubmitting(false);
          };
          removeChannelSocket({ id }, callback);
        },
      },
    },
    rename: {
      title: t('modal.renameTitle'),
      btnText: t('modal.addBtn'),
      btnVariant: 'primary',
      formProps: {
        initialValues: { name: currentName },
        validationSchema: schema,
        onSubmit: async ({ name }, { resetForm, setSubmitting }) => {
          const callback = () => {
            toast.success(t('modal.renameNotify'));
            handleClose();
            resetForm();
            setSubmitting(false);
          };
          renameChannelSocket({ id, name: filter.clean(name.trim(), '*') }, callback);
        },
      },
    },
  };

  return (
    <BootstrapModal show={isOpen} backdrop="static" onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{config[action].title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik {...config[action].formProps} validateOnBlur={false}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <BootstrapModal.Body>
              {action === 'remove' ? (
                <p className="lead">{t('modal.removeText')}</p>
              )
                : (
                  <Form.Group className="mb-2 modal-input-block">
                    <Form.Control
                      ref={inputEl}
                      name="name"
                      onChange={formik.handleChange}
                      {...formik.getFieldProps('name')}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                )}
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancelBtn')}</Button>
              <Button
                variant={config[action].btnVariant}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {config[action].btnText}
              </Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </BootstrapModal>
  );
};
