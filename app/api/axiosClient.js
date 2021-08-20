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
