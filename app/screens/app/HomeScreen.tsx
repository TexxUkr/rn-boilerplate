import { FC, useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Text, ListView } from '@/components';
import { Screen } from '@/components/screen/Screen';
import { AlbumItem } from '@/components/lastfm/AlbumItem';
import { AppStackScreenProps } from '@/navigators/AppNavigator';
import type { ThemedStyle } from '@/theme';
import { useSafeAreaInsetsStyle } from '@/utils/useSafeAreaInsetsStyle';
import { useAppTheme } from '@/utils/useAppTheme';
import { screenName } from '@/navigators/screenName';
import { useGetTopAlbums } from '@/services/api';
import {
  FlashList,
  ListRenderItem,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import styled from '@emotion/native';
import { SearchBar } from '@/components/SearchBar/SearchBar';

const Dummy = styled.View({
  height: 100,
});

const Search = styled.TextInput(
  {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  ({ theme }) => ({
    borderColor: theme.colors.palette.neutral400,
    borderWidth: 2,
    borderRadius: theme.spacing.sm,
    paddingHorizontal: 10,
  }),
);

const InputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

interface HomeScreenProps
  extends AppStackScreenProps<typeof screenName.appStack.home> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [artistName, setArtistName] = useState<string>();
  const { themed, theme } = useAppTheme();
  const { data, error, isLoading, resetQuery, useFetchOneQuery } =
    useGetTopAlbums();

  useEffect(() => {
    if (artistName) {
      useFetchOneQuery(artistName);
    }
  }, [artistName, useFetchOneQuery]);

  const onItemPressHandler = useCallback((albumName: string) => {
    console.log('onItemPressHandler');
    // navigation.navigate('Album', { albumName });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: AlbumResponse }) => (
      <AlbumItem album={item} onPress={() => onItemPressHandler(item.name)} />
    ),
    [onItemPressHandler],
  );

  return (
    <Container preset="fixed">
      <InputContainer>
        <SearchBar searchPhrase={artistName} onSubmit={setArtistName} />
      </InputContainer>
      <FlashList
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>No albums found</Text>
          </View>
        }
        ListFooterComponent={<Dummy />}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        data={data}
        renderItem={renderItem}
      />
    </Container>
  );
};

const Container = styled(Screen)({
  flexDirection: 'column',
  paddingHorizontal: 10,
});
