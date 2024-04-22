import {Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {
  //medidas seguras de acuerdo al movil
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage} =
    useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/* main carrousel */}
        <PosterCarousel movies={nowPlaying} />

        {/* populars movies */}
        <HorizontalCarousel
          movies={popular}
          title='Populars'
          loadNextPage={popularNextPage}
        />

        {/* top rated movies */}
        <HorizontalCarousel movies={topRated} title='Top Rated' />

        {/* upcoming movies */}
        <HorizontalCarousel movies={upcoming} title='Upcoming' />
      </View>
    </ScrollView>
  );
};
