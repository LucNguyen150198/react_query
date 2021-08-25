import axiosClient from './axiosClient';
import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query';
import Configs from '@config';
const OPTIONS = {
  baseURL: Configs.BASE_URL_USER,
  headers: {
    Authorization: Configs.TOKEN ? `Bearer ${Configs.TOKEN}` : '',
  },
};
const user = {
  useGetUsers: (status) => {
    return useInfiniteQuery(
      ['users', status],
      ({ pageParam = 1 }) => {
        return axiosClient.get('users', {
          ...OPTIONS,
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
        keepPreviousData: true,
      }
    );
  },

  useGetUser: (id) => {
    return useQuery(
      ['users', id],
      () =>
        axiosClient.get(`users/${id}`, {
          ...OPTIONS,
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
          ...OPTIONS,
        }),
      { enabled: !!params?.name }
    );
  },

  addUser: async (data) => {
    return axiosClient.post('users', data, {
      ...OPTIONS,
    });
  },
};

export default user;
