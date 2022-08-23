import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoutes } from '../../routes';
import { DataResponse } from './types';

const getDataRequest = createAsyncThunk<DataResponse>(
  '@getDataRequest',
  async () => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const { data }: { data: DataResponse } = await axios.get(ApiRoutes.DATA, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data as DataResponse;
  },
);

export default getDataRequest;
