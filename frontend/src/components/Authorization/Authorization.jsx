import React from 'react';
import AuthorizationForm from './AuthorizationForm';
import CardForm from '../common/CardForm';

const Authorization = () => (
  <CardForm isAuthorization>
    <AuthorizationForm />
  </CardForm>
);

export default Authorization;
