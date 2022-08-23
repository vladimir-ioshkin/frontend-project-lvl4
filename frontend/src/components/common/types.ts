import { FormEvent, ReactNode } from 'react';
import { TypedSchema } from 'yup/lib/util/types';
import { ErrorCodes } from '../../types';

export interface CardFormProps {
  isAuthorization?: boolean;
  children: ReactNode;
}

export interface FieldProps {
  label: string;
  value: string;
  isInvalid: boolean;
  errorText?: string;
  onChange: (e: FormEvent<HTMLElement>) => void;
}

export interface LoginFieldProps extends FieldProps {}

export interface PasswordFieldProps extends FieldProps {
  name: string;
}

export interface Values {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginFormProps {
  initialValues: Values;
  validationSchema: TypedSchema;
  path: string;
  errorCode: ErrorCodes;
}
