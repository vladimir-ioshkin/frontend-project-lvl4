import { useFormik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { object, string } from 'yup';


export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string().required(),
      password: string().required(),
    }),
    onSubmit: async (values) => {
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
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            Введите ваш ник
          </Form.Control.Feedback>
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
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            Введите пароль
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
    </Form>
  );
};
