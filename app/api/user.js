import axiosClient from './axiosClient';
import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query';
import Configs from '@config';

const user = {
  useGetUsers: (status) => {
    return useInfiniteQuery(
      ['users', status],
      ({ pageParam = 1 }) => {
        return axiosClient.get('users', {
          baseURL: Configs.BASE_URL_USER,
          params: { page: pageParam, status },
        });
      },
      {
        getNextPageParam: (lastPage) => {
          const page = lastPage?.meta?.pagination?.page;
          const pages = lastPage?.meta?.pagination?.pages;
          if (page < pages) {
            return +page + 1;
          }
        },
        keepPreviousData: true
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

  useSearchUser: (params) => {
    return useQuery(
      ['users', params?.name],
      () =>
        axiosClient.get('users', {
          params: params,
          baseURL: Configs.BASE_URL_USER,
        }),
      { enabled: !!params?.name }
    );
  },

  addUser: async (data) => {
    return  axiosClient.post('users', data, {
      baseURL: Configs.BASE_URL_USER,
    });
  },
};

export default user;
