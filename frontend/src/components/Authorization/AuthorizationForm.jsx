import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { apiRoutes } from '../../routes.js';
import { AUTH_ERROR_CODE } from '../../constants.js';
import { LoginField } from '../common/LoginField.jsx';
import { PasswordField } from '../common/PasswordField.jsx';
import { useLoginForm } from '../common/useLoginForm.js';

export const AuthorizationForm = () => {
  const { t } = useTranslation();
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object({
    username: yup.string().required(t('errors.noUsername')),
    password: yup.string().required(t('errors.noPassword')),
  });

  const { formik, isError, setIsError } = useLoginForm({
    initialValues,
    validationSchema,
    path: apiRoutes.loginPath(),
    errorCode: AUTH_ERROR_CODE,
  });

  const handleChange = (e) => {
    setIsError(false);
    formik.handleChange(e);
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('authorization.title')}</h1>
      <LoginField
        label={t('authorization.username')}
        value={formik.values.username}
        isInvalid={(formik.touched.username && formik.errors.username) || isError}
        errorText={isError ? '' : formik.errors.username}
        onChange={handleChange}
      />
      <PasswordField
        label={t('authorization.password')}
        name="password"
        value={formik.values.password}
        errorText={isError ? '' : formik.errors.password}
        isInvalid={(formik.touched.password && formik.errors.password) || isError}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('authorization.submitButton')}
      </Button>
      {isError && <Form.Text className="text-danger">{t('errors.login')}</Form.Text>}
    </Form>
  );
};
