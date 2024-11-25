import { FC, useEffect } from 'react';
import { Screen } from '@/components/screen/Screen';
import { AppStackScreenProps } from '@/navigators/AppNavigator';
import { screenName } from '@/navigators/screenName';
import { useGetArtistInfo } from '@/services/api';
import styled from '@emotion/native';
import { ArtistHeader, DummyContainer, ArtistBlurHeader } from './components';
import { Text, ErrorView } from '@/components';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export const dummyArray = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

interface ArtistScreenProps
  extends AppStackScreenProps<typeof screenName.appStack.artist> {}

export const ArtistScreen: FC<ArtistScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const { data, error, isLoading, useFetchOneQuery } = useGetArtistInfo();

  useEffect(() => {
    if (params?.artistName) {
      useFetchOneQuery(params?.artistName);
    }
  }, [params?.artistName, useFetchOneQuery]);

  const onRetryHandler = () => {
    if (params?.albumName) {
      useFetchOneQuery(params?.albumName);
    }
  };

  if (error && !isLoading) {
    return (
      <Container preset="fixed" unsafe>
        <ArtistHeader
          title={params?.artistName}
          titleMode="center"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
        <ErrorView onRetryHandler={onRetryHandler} />
      </Container>
    );
  } else {
    return (
      <>
        <Container preset="scroll" unsafe>
          <DummyContainer pointerEvents="none">
            <ArtistHeader
              title={params?.artistName}
              titleMode="center"
              leftIcon="back"
              onLeftPress={() => navigation.goBack()}
            />
          </DummyContainer>
          {isLoading ? (
            dummyArray.map((_, i) => (
              <SkeletonPlaceholder key={i}>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  height={20}
                  borderRadius={15}
                  marginBottom={10}
                />
              </SkeletonPlaceholder>
            ))
          ) : (
            <Text>{data?.bio.content}</Text>
          )}
        </Container>
        <ArtistBlurHeader
          title={params?.artistName}
          titleMode="center"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
        />
      </>
    );
  }
};

const Container = styled(Screen)({
  flexDirection: 'column',
  paddingHorizontal: 10,
});
