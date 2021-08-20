import axiosClient from './axiosClient';
import { useQuery, useInfiniteQuery } from 'react-query';
import Configs from '@config';
const user = {
  useGetUsers: () => {
    return useInfiniteQuery(
      'users',
      ({ pageParam = 1 }) => {
        return axiosClient.get('users', {
          baseURL: Configs.BASE_URL_USER,
          params: { page: pageParam, per_page: 8 },
        });
      },
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.page < lastPage?.total_pages) {
            return +lastPage?.page + 1;
          }
        },
      }
    );
  },

  useGetUser: (id) => {
    return useQuery(
      ['users', id],
      () =>
        axiosClient.get(`users/${id}`, {
          baseURL: Configs.BASE_URL_USER,
        }),
      { enabled: !!id }
    );
  },

  addUser: (data) => {
    axiosClient.post('users', data, {
      baseURL: Configs.BASE_URL_USER,
    });
  },
};

export default user;
