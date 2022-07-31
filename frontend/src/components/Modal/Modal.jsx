import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { modalIsOpenSelector, modalChannelSelector, closeModal } from '../../store/slices/modal';
import useModalConfig from './useModalConfig';
import { MODAL_REMOVE } from '../../constants';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isOpen = useSelector(modalIsOpenSelector);
  const { action } = useSelector(modalChannelSelector);
  const inputEl = useRef();

  useEffect(() => {
    if (isOpen && inputEl?.current && action !== MODAL_REMOVE) {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [isOpen, action]);

  const handleClose = () => dispatch(closeModal());

  const {
    title,
    btnText,
    btnVariant,
    initialValues,
    validationSchema,
    onSubmit,
  } = useModalConfig();

  return (
    <BootstrapModal show={isOpen} backdrop="static" onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <BootstrapModal.Body>
              {action === MODAL_REMOVE ? (
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
                variant={btnVariant}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {btnText}
              </Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </BootstrapModal>
  );
};

export default Modal;
