import axiosClient from './axiosClient';
import { useQuery } from 'react-query';
const people = {
  useGetAllPeople: () => {
    return useQuery('people', () => axiosClient.get('people'));
  },

  useGetPeople: (id) => {
    return useQuery(['people', id], () => axiosClient.get(`people/${id}`));
  },
};

export default people;
