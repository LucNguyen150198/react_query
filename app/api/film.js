import axiosClient from './axiosClient';
import { useQuery, useInfiniteQuery } from 'react-query';
const film = {
  useGetFilms: (params) => {
    return useInfiniteQuery(
      ['films', params.page],
      () => axiosClient.get('films', { params }),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  },

  useGetFilm: (id) => {
    return useQuery(['films', id], () => axiosClient.get(`films/${id}`));
  },
};

export default film;
