import React, { FunctionComponent } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { LoginFieldProps } from './types';

const LoginField: FunctionComponent<LoginFieldProps> = ({
  label, value, isInvalid, errorText, onChange,
}) => (
  <Form.Group className="form-floating mb-3">
    <FloatingLabel controlId="username" label={label}>
      <Form.Control
        onChange={onChange}
        value={value}
        name="username"
        autoComplete="username"
        isInvalid={isInvalid}
        autoFocus
      />
      {errorText && (
      <Form.Control.Feedback type="invalid">
        {errorText}
      </Form.Control.Feedback>
      )}
    </FloatingLabel>
  </Form.Group>
);

export default LoginField;
