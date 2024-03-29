import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { TypedSchema } from 'yup/lib/util/types';
import { ErrorCodes } from '../../types';
import { ApiRoutes } from '../../routes';
import LoginField from '../common/LoginField';
import PasswordField from '../common/PasswordField';
import useLoginForm from '../common/useLoginForm';
import { Values } from '../common/types';

const SignUpForm: FunctionComponent = () => {
  const { t } = useTranslation();
  const initialValues: Values = {
    username: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema: TypedSchema = yup.object({
    username: yup.string()
      .min(3, t('errors.usernameMinMax', { min: 3, max: 20 }))
      .max(20, t('errors.usernameMinMax', { min: 3, max: 20 }))
      .required(t('errors.required')),
    password: yup.string()
      .min(6, t('errors.passwordMin', { min: 6 }))
      .required(t('errors.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], t('errors.confirmPassword'))
      .required(t('errors.required')),
  });

  const { formik, isError, setIsError } = useLoginForm({
    initialValues,
    validationSchema,
    path: ApiRoutes.SIGNUP,
    errorCode: ErrorCodes.CONFLICT,
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('signUp.title')}</h1>
      <LoginField
        label={t('signUp.username')}
        value={formik.values.username}
        isInvalid={Boolean(formik.touched.username && formik.errors.username) || isError}
        errorText={isError ? t('errors.userExists') : formik.errors.username}
        onChange={(e) => {
          setIsError(false);
          formik.handleChange(e);
        }}
      />
      <PasswordField
        label={t('signUp.password')}
        name="password"
        value={formik.values.password}
        errorText={formik.errors.password}
        isInvalid={Boolean(formik.touched.password && formik.errors.password)}
        onChange={formik.handleChange}
      />
      <PasswordField
        label={t('signUp.confirmPassword')}
        name="confirmPassword"
        value={formik.values.confirmPassword}
        errorText={formik.errors.confirmPassword}
        isInvalid={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
      >
        {t('signUp.submitButton')}
      </Button>
    </Form>
  );
};

export default SignUpForm;
