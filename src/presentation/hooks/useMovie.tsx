import {useEffect, useState} from 'react';
import { FullMovie } from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import { movieDBfetcher } from '../../config/adapters/movieDB.adapter';
import { Cast } from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async() => {
    setIsLoading(true);
    
    const moviePromise = UseCases.getMovieByIdUseCase(movieDBfetcher, movieId);
    const castPromise = UseCases.getMovieCastUseCase(movieDBfetcher, movieId);

    const [movie, cast] = await Promise.all([moviePromise, castPromise]);
    
    setMovie(movie);
    setCast(cast);
    setIsLoading(false);      
  };

  return {
    isLoading,
    movie,
    cast
  };
};
