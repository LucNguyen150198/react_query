import axiosClient from './axiosClient';
import { useQuery, useInfiniteQuery, useQueryClient } from 'react-query';
import Configs from '@config';
const OPTIONS = {
  baseURL: Configs.BASE_URL_TRAVEL,
  headers: {
    Authorization: Configs.TOKEN_TRAVEL ? `Bearer ${Configs.TOKEN_TRAVEL}` : '',
  },
};

const travel = {
  useGetTravels: () => {
    return useInfiniteQuery(
      'travels',
      ({ pageParam = 1 }) => {
        return axiosClient.get('curated', {
          ...OPTIONS,
          params: { page: pageParam },
        });
      },
      {
        getNextPageParam: (lastPage) => {
          const page = lastPage?.page;
          const pages = Math.ceil(lastPage?.total_results / lastPage?.per_page);
          if (page < pages) {
            return +page + 1;
          }
        },
        keepPreviousData: true,
      }
    );
  },

  useGetTravel: (id) => {
    return useQuery(
      ['travels', id],
      () =>
        axiosClient.get(`photos/${id}`, {
          ...OPTIONS,
        }),
      { enabled: !!id }
    );
  },

  useSearchTravel: (params) => {
    return useQuery(
      ['travels', params?.query],
      () =>
        axiosClient.get('search', {
          params,
          ...OPTIONS,
        }),
      { enabled: !!params?.query }
    );
  },

  // addUser: async (data) => {
  //   return axiosClient.post('users', data, {
  //     baseURL: Configs.BASE_URL_USER,
  //   });
  // },
};

export default travel;
