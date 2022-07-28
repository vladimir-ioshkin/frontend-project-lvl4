import React, { useContext, useEffect, useRef } from 'react';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal.js';
import { SocketContext } from '../../contexts/SocketContext.js';
import { CurrentChannelContext } from '../../contexts/CurrentChannelContext.js';
import { selectors } from '../../store/slices/channels.js';

export const Modal = () => {
  const { t } = useTranslation();
  const { addChannelSocket, removeChannelSocket, renameChannelSocket } = useContext(SocketContext);
  const isOpen = useSelector(modalIsOpenSelector);
  const { action, id, name: currentName } = useSelector(modalChannelSelector);
  const { setCurrentChannelId } = useContext(CurrentChannelContext);
  const channels = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const inputEl = useRef();

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isOpen && inputEl?.current && action !== 'remove') {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [isOpen, action]);

  yup.setLocale({
    mixed: {
      required: t('modal.requiredError'),
      notOneOf: t('modal.existError'),
    },
  });

  const schema = yup.object({
    name: yup.string().required().notOneOf(channels.map(({ name }) => name)),
  });

  const config = {
    add: {
      titleCode: 'modal.addTitle',
      btnTextCode: 'modal.addBtn',
      btnVariant: 'primary',
      formProps: {
        initialValues: { name: '' },
        validationSchema: schema,
        onSubmit: async ({ name }, { resetForm }) => {
          const callback = ({ data }) => {
            setCurrentChannelId(data.id);
            handleClose();
            resetForm();
          };
          addChannelSocket({ name: name.trim() }, callback);
        },
      },
    },
    remove: {
      titleCode: 'modal.removeTitle',
      btnTextCode: 'modal.removeBtn',
      btnVariant: 'danger',
      formProps: {
        initialValues: {},
        onSubmit: async () => {
          const callback = () => {
            handleClose();
          };
          removeChannelSocket({ id }, callback);
        },
      },
    },
    rename: {
      titleCode: 'modal.renameTitle',
      btnTextCode: 'modal.addBtn',
      btnVariant: 'primary',
      formProps: {
        initialValues: { name: currentName },
        validationSchema: schema,
        onSubmit: async ({ name }, { resetForm }) => {
          const callback = () => {
            handleClose();
            resetForm();
          };
          renameChannelSocket({ id, name: name.trim() }, callback);
        },
      },
    },
  };

  return (
    <BootstrapModal show={isOpen} backdrop="static" onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t(config[action].titleCode)}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik {...config[action].formProps}>
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
                      {...formik.getFieldProps('name')}
                      isInvalid={(formik.touched.name && formik.errors.name)}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                )}
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancelBtn')}</Button>
              <Button variant={config[action].btnVariant} type="submit">{t(config[action].btnTextCode)}</Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </BootstrapModal>
  );
};
