import { FC, useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Text, ErrorView } from '@/components';
import { Screen } from '@/components/screen/Screen';
import { AppStackScreenProps } from '@/navigators/AppNavigator';
import { screenName } from '@/navigators/screenName';
import { useGetTopAlbums } from '@/services/api';
import styled from '@emotion/native';
import TopAlbumRecordItemSkeleton, {
  dummyArray as loadingDummyArray,
} from '@/components/TopAlbumRecordItemSkeleton';
import {
  HomeScreenHeader,
  SearchBarHome,
  DummySearchBarContainer,
  DummyAlbumItem,
  AlbumItem,
} from './components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppTheme } from '@/utils/useAppTheme';

const Container = styled(Screen)({
  flexDirection: 'column',
  paddingHorizontal: 10,
});

const EmptyListContainer = styled.View({
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const ArtistBioFABContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 20,
  right: 20,
});

const ItemSeparator = styled.View({ height: 10 });

interface HomeScreenProps
  extends AppStackScreenProps<typeof screenName.appStack.home> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [artistName, setArtistName] = useState<string>();
  const { data, error, isLoading, useFetchOneQuery } = useGetTopAlbums();

  useEffect(() => {
    if (artistName) {
      useFetchOneQuery(artistName);
    }
  }, [artistName, useFetchOneQuery]);

  const onRetryHandler = () => {
    if (artistName) {
      useFetchOneQuery(artistName);
    }
  };

  const onItemPressHandler = useCallback(
    ({
      albumMbid,
      albumName,
      artistName,
    }: {
      albumMbid: string;
      albumName: string;
      artistName: string;
    }) => {
      navigation.navigate(screenName.appStack.album, {
        albumMbid,
        albumName,
        artistName,
      });
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: Album }) => (
      <AlbumItem
        album={item}
        onPress={() =>
          onItemPressHandler({
            albumMbid: item.mbid,
            albumName: item.name,
            artistName: item.artist.name,
          })
        }
      />
    ),
    [onItemPressHandler],
  );

  const { theme } = useAppTheme();
  return (
    <Container preset="fixed" unsafe>
      {error && !isLoading ? (
        <ErrorView onRetryHandler={onRetryHandler} />
      ) : (
        <FlatList
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <EmptyListContainer>
              <Text tx="home:empty" />
            </EmptyListContainer>
          }
          ListHeaderComponent={
            <DummySearchBarContainer pointerEvents="none">
              <SearchBarHome />
            </DummySearchBarContainer>
          }
          ListFooterComponent={<DummyAlbumItem />}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          data={isLoading ? loadingDummyArray : data}
          renderItem={isLoading ? TopAlbumRecordItemSkeleton : renderItem}
        />
      )}
      {artistName && (
        <ArtistBioFABContainer>
          <Icon
            backgroundColor={'transparent'}
            name="info-circle"
            size={80}
            color={theme.colors.palette.secondary500}
            onPress={() =>
              navigation.navigate(screenName.appStack.artist, {
                artistName,
              })
            }
          />
        </ArtistBioFABContainer>
      )}
      <HomeScreenHeader searchPhrase={artistName} onSubmit={setArtistName} />
    </Container>
  );
};
