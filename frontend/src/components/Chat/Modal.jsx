import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as yup from 'yup';
import filter from 'leo-profanity';
import SocketContext from '../../contexts/SocketContext';
import {
  currentChannelIdSelector, selectors, setCurrentChannelId, setDefaultChannel,
} from '../../store/slices/channels';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addChannelSocket, removeChannelSocket, renameChannelSocket } = useContext(SocketContext);
  const isOpen = useSelector(modalIsOpenSelector);
  const { action, id, name: currentName } = useSelector(modalChannelSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);
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
          const callback = ({ data, status }) => {
            if (status === 'ok') {
              toast.success(t('modal.addNotify'));
              dispatch(setCurrentChannelId({ id: data.id }));
            } else {
              toast.error(t('errors.server'));
            }
            handleClose();
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
          const callback = ({ status }) => {
            if (status === 'ok') {
              if (currentChannelId === id) {
                dispatch(setDefaultChannel());
              }
              toast.success(t('modal.removeNotify'));
            } else {
              toast.error(t('errors.server'));
            }
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
          const callback = ({ status }) => {
            if (status === 'ok') {
              toast.success(t('modal.renameNotify'));
            } else {
              toast.error(t('errors.server'));
            }
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

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Formik {...config[action].formProps} validateOnBlur={false}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <BootstrapModal.Body>
              {action === 'remove' ? (
                <p className="lead">{t('modal.removeText')}</p>
              )
                : (
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

export default Modal;
