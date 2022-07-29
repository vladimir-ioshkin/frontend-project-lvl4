import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRollbar } from '@rollbar/react';
import { AuthorizationContext } from '../../contexts/AuthorizationContext.js';
import { CONFLICT_ERROR_CODE } from '../../constants.js';
import { apiRoutes, pages } from '../../routes.js';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { logIn } = useContext(AuthorizationContext);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      try {
        const response = await axios.post(apiRoutes.signUpPath(), { username, password });
        const { token } = response.data;
        logIn({ token, username });
        navigate(pages.chat);
      } catch (error) {
        if (error.message.includes(CONFLICT_ERROR_CODE)) {
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

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('signUp.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <FloatingLabel controlId="username" label={t('signUp.username')}>
          <Form.Control
            onChange={(e) => {
              setIsError(false);
              formik.handleChange(e);
            }}
            value={formik.values.username}
            name="username"
            autoComplete="username"
            isInvalid={(formik.touched.username && formik.errors.username) || isError}
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            {isError ? t('errors.userExists') : formik.errors.username}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel controlId="password" label={t('signUp.password')}>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            autoComplete="current-password"
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel controlId="confirmPassword" label={t('signUp.confirmPassword')}>
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            name="confirmPassword"
            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
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
