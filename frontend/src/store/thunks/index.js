import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../../routes.js';

const getDataRequest = createAsyncThunk(
  '@getDataRequest',
  async () => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    const { data } = await axios.get(apiRoutes.dataPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
);

export default { getDataRequest };
