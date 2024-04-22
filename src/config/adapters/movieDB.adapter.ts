import { THE_MOVIE_DB_KEY } from '@env';
import {AxiosAdapter} from './http/axios.adapter';

export const movieDBfetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    // api_key: '8d310dcde8416f361022cb431c7259fa',
    api_key: THE_MOVIE_DB_KEY ?? 'no-keyy',
    language: 'es',
  },
});
