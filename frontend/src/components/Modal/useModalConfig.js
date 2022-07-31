import { useContext, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import filter from 'leo-profanity';
import SocketContext from '../../contexts/SocketContext';
import {
  currentChannelIdSelector, selectors, setCurrentChannelId, setDefaultChannel,
} from '../../store/slices/channels';
import { modalChannelSelector, closeModal } from '../../store/slices/modal';
import { MODAL_ADD, MODAL_REMOVE, MODAL_RENAME } from '../../constants';

const useModalConfig = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { addChannelSocket, removeChannelSocket, renameChannelSocket } = useContext(SocketContext);
  const { action, id, name: currentName } = useSelector(modalChannelSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);
  const channels = useSelector(selectors.selectAll);

  const initialValues = useMemo(() => {
    switch (action) {
      case MODAL_ADD:
        return { name: '' };
      case MODAL_REMOVE:
        return { };
      case MODAL_RENAME:
        return { name: currentName };
      default:
        throw new Error(`Unknown case ${action}`);
    }
  }, [action, currentName]);

  const schema = useMemo(() => yup.object({
    name: yup.string()
      .required(t('modal.requiredError'))
      .notOneOf(channels.map(({ name }) => name), t('modal.existError')),
  }), [channels, t]);

  const onSubmit = useCallback(({ name }, formikActions) => {
    const handleSubmit = ({ data, status }, { resetForm, setSubmitting }, callback) => {
      dispatch(closeModal());
      resetForm();
      setSubmitting(false);
      if (status !== 'ok') {
        toast.error(t('errors.server'));
        return;
      }
      toast.success(t(`modal.${action}Notify`));
      if (callback) {
        callback(data);
      }
    };

    switch (action) {
      case MODAL_ADD: {
        const addCallback = (data) => dispatch(setCurrentChannelId({ id: data.id }));

        return addChannelSocket(
          { name: filter.clean(name.trim(), '*') },
          (response) => handleSubmit(response, formikActions, addCallback),
        );
      }
      case MODAL_REMOVE: {
        const removeCallback = () => {
          if (currentChannelId !== id) return;
          dispatch(setDefaultChannel());
        };

        return removeChannelSocket(
          { id },
          (response) => handleSubmit(response, formikActions, removeCallback),
        );
      }
      case MODAL_RENAME: {
        return renameChannelSocket(
          { id, name: filter.clean(name.trim(), '*') },
          (response) => handleSubmit(response, formikActions),
        );
      }
      default:
        throw new Error(`Unknown case ${action}`);
    }
  }, [
    action,
    id,
    currentChannelId,
    addChannelSocket,
    removeChannelSocket,
    renameChannelSocket,
    dispatch,
    t,
  ]);

  return useMemo(() => ({
    title: t(`modal.${action}Title`),
    btnText: t(`modal.${action}Btn`),
    btnVariant: action === MODAL_REMOVE ? 'danger' : 'primary',
    initialValues,
    validationSchema: action === MODAL_REMOVE ? undefined : schema,
    onSubmit,
  }), [action, t, initialValues, schema, onSubmit]);
};

export default useModalConfig;
