import React from 'react';
import { AuthorizationForm } from './AuthorizationForm.jsx';
import { CardForm } from '../common/CardForm.jsx';

export const Authorization = () => (
  <CardForm isAuthorization>
    <AuthorizationForm />
  </CardForm>
);
