import React, { FunctionComponent } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { PasswordFieldProps } from './types';

const PasswordField: FunctionComponent<PasswordFieldProps> = ({
  label, name, value, errorText, isInvalid, onChange,
}) => (
  <Form.Group className="form-floating mb-4">
    <FloatingLabel controlId={name} label={label}>
      <Form.Control
        type="password"
        onChange={onChange}
        value={value}
        name={name}
        autoComplete={name === 'password' ? undefined : 'current-password'}
        isInvalid={isInvalid}
      />
      {errorText && (
        <Form.Control.Feedback type="invalid">
          {errorText}
        </Form.Control.Feedback>
      )}
    </FloatingLabel>
  </Form.Group>
);

export default PasswordField;
