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
import { apiRoutes, pages } from '../../routes.js';
import { AUTH_ERROR_CODE } from '../../constants.js';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { logIn } = useContext(AuthorizationContext);

  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('errors.noUsername')),
      password: yup.string().required(t('errors.noPassword')),
    }),
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      try {
        const response = await axios.post(apiRoutes.loginPath(), { username, password });
        const { token } = response.data;
        logIn({ token, username });
        navigate(pages.chat);
      } catch (error) {
        if (error.message.includes(AUTH_ERROR_CODE)) {
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

  const handleChange = (e) => {
    setIsError(false);
    formik.handleChange(e);
  };

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('authorization.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <FloatingLabel controlId="username" label={t('authorization.username')}>
          <Form.Control
            autoFocus
            onChange={handleChange}
            value={formik.values.username}
            name="username"
            autoComplete="username"
            isInvalid={(formik.touched.username && formik.errors.username) || isError}
          />
          {!isError && <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel controlId="password" label={t('authorization.password')}>
          <Form.Control
            type="password"
            onChange={handleChange}
            value={formik.values.password}
            name="password"
            autoComplete="current-password"
            isInvalid={(formik.touched.password && formik.errors.password) || isError}
          />
          {!isError && <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>}
        </FloatingLabel>
      </Form.Group>
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
