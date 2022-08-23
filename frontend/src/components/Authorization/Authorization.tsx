import React, { FunctionComponent } from 'react';
import AuthorizationForm from './AuthorizationForm';
import CardForm from '../common/CardForm';

const Authorization: FunctionComponent = () => (
  <CardForm isAuthorization>
    <AuthorizationForm />
  </CardForm>
);

export default Authorization;
