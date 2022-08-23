import {
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import AuthorizationContext from '../../contexts/AuthorizationContext';
import { Pages } from '../../routes';
import { IAuthorizationValue } from '../../providers/types';
import { LoginFormProps, Values } from './types';

const useLoginForm = ({
  initialValues, validationSchema, path, errorCode,
}: LoginFormProps): {
  formik: FormikProps<Values>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
} => {
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const { logIn } = useContext<IAuthorizationValue>(AuthorizationContext);
  const [isError, setIsError] = useState<boolean>(false);

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      try {
        const { data: { token } } = await axios.post(path, { username, password });
        logIn({ token, username });
        navigate(Pages.CHAT);
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
  } as FormikConfig<Values>);

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

export default useLoginForm;
