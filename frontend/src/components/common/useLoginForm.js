import { useContext, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { pages } from '../../routes.js';

export const useLoginForm = ({
  initialValues, validationSchema, path, errorCode,
}) => {
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const { logIn } = useContext(AuthorizationContext);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      try {
        const { data: { token } } = await axios.post(path, { username, password });
        logIn({ token, username });
        navigate(pages.chat);
      } catch (error) {
        if (error.message.includes(errorCode)) {
          setIsError(true);
          return;
        }
        toast.error(t('errors.server'));
        rollbar.error(t('errors.server'), error, { username, password });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return useMemo(() => ({
    formik,
    isError,
    setIsError,
  }), [
    formik,
    isError,
    setIsError,
  ]);
};
