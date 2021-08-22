import axios from 'axios';
import queryString from 'query-string';
import Config from '@config';
const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 8cdbd5f6c2707d00c6b874c5e6b99dc062287022b64859bc8ccc0e6f8e68bf43',
  },
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
