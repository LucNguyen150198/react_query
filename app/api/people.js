import axiosClient from './axiosClient';
import {
  useQuery,
  useQueries,
  useInfiniteQuery,
  useQueryClient
} from 'react-query';
const people = {
  useGetAllPeople: (params) => {
    return useQuery(
      ['people', params?.search],
      () => axiosClient.get('people', { params }),
      { enabled: !!params?.search }
    );
  },

  useGetPeople: (id) => {
    return useQuery(['people', id], () => axiosClient.get(`people/${id}`), {
      enabled: !!id,
    });
  },
  useGetParallelPeople: (ids) => {
    const queries = ids.map((id) => {
      return {
        queryKey: ['people', id],
        queryFn: () => axiosClient.get(`people/${id}`),
      };
    });

    return useQueries(queries);
  },
  useGetInfinitePeoples: () => {
    return useInfiniteQuery(
      'people',
      ({ pageParam = 1 }) =>
        axiosClient.get('people', { params: { page: pageParam } }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.next) {
            const nextPage = +lastPage.next.split('=')[1];
            return nextPage;
          }
        },
      }
    );
  },
};

export default people;
