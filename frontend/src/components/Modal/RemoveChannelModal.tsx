import React, { FunctionComponent, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal as BootstrapModal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import ChatApiContext from '../../contexts/ChatApiContext';
import { currentChannelIdSelector, setDefaultChannel } from '../../store/slices/channels';
import { AppDispatch } from '../../store';
import { ISocketActions } from '../types';
import { RemoveChannelModalProps } from './types';

const RemoveChannelModal: FunctionComponent<RemoveChannelModalProps> = ({ handleClose, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { removeChannelSocket } = useContext<ISocketActions>(ChatApiContext);
  const currentChannelId: number = useSelector(currentChannelIdSelector);

  const onSubmit = (_, { setSubmitting }) => {
    const callback = ({ status }) => {
      handleClose();
      setSubmitting(false);

      if (status !== 'ok') {
        toast.error(t('errors.server'));
        return;
      }

      toast.success(t('modal.removeNotify'));
      if (currentChannelId !== id) {
        return;
      }
      dispatch(setDefaultChannel());
    };

    removeChannelSocket({ id }, callback);
  };

  return (
    <>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t('modal.removeTitle')}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <Formik initialValues={{}} onSubmit={onSubmit}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <BootstrapModal.Body>
              <p className="lead">{t('modal.removeText')}</p>
            </BootstrapModal.Body>

            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancelBtn')}</Button>
              <Button
                variant="danger"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.removeBtn')}
              </Button>
            </BootstrapModal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RemoveChannelModal;
