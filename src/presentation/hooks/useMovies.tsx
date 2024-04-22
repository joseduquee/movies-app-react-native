import {useEffect, useState} from 'react';
import type {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBfetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const [nowPlayingMovies, upcoming, topRated, popular] = await Promise.all(
        [
          await UseCases.moviesNowPlayingUseCase(movieDBfetcher),
          await UseCases.moviesUpcomingUseCase(movieDBfetcher),
          await UseCases.moviesTopRatedUseCase(movieDBfetcher),
          await UseCases.moviesPopularUseCase(movieDBfetcher),
        ],
      );
      setNowPlaying(nowPlayingMovies);
      setUpcoming(upcoming);
      setTopRated(topRated);
      setPopular(popular);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    isLoading,
    nowPlaying,
    upcoming,
    topRated,
    popular,

    //Methods
    popularNextPage: async() => {
        popularPageNumber++;
        const popularMovies = await UseCases.moviesPopularUseCase(movieDBfetcher, {
            page: popularPageNumber
        });
        setPopular(prevPopular => [...prevPopular, ...popularMovies])
    }
  };
};
