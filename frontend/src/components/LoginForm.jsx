import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiRoutes, pages } from '../routes.js';
import { AuthorizationContext } from '../contexts/AuthorizationContext.js';

export const LoginForm = () => {
  const [isError, setIsError] = useState(false);
  const { logIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string().required(),
      password: string().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(apiRoutes.loginPath(), values);
        const { token } = response.data;
        logIn({
          token,
          username: values.username,
        });
        navigate(pages.chat);
      } catch (error) {
        setIsError(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <FloatingLabel controlId="username" label="Ваш ник">
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            autoComplete="username"
            isInvalid={(formik.touched.username && formik.errors.username) || isError}
          />
          {!isError && <Form.Control.Feedback type="invalid">
            Введите ваш ник
          </Form.Control.Feedback>}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel controlId="password" label="Пароль">
          <Form.Control
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            autoComplete="current-password"
            isInvalid={(formik.touched.password && formik.errors.password) || isError}
          />
          {!isError && <Form.Control.Feedback type="invalid">
            Введите пароль
          </Form.Control.Feedback>}
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
      {isError ? <Form.Text className="text-danger">Неверные имя пользователя или пароль</Form.Text> : null}
    </Form>
  );
};
