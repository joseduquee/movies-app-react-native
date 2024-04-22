import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView, Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;
  const {isLoading, movie, cast} = useMovie(movieId);

  //Otra forma
  // const { movieId } = useRoute().params;
  // console.log({movieId});

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      {/* Header */}
      {movie && (
        <MovieHeader
          originalTitle={movie.originalTitle}
          title={movie.title}
          poster={movie.poster}
        />
      )}

      {/* Details */}
      {movie && cast && <MovieDetails movie={movie} cast={cast} />}
    </ScrollView>
  );
};
