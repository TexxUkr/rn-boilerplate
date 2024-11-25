import styled from '@emotion/native';
import { Text } from '@/components';

export const ALBUM_ITEM_HEIGHT = 80;

const Container = styled.TouchableOpacity(
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    flex: 1,
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.palette.overlay20,
    borderRadius: theme.spacing.sm,
  }),
);

const AlbumName = styled(Text)({});

const AlbumImage = styled.Image(
  {
    width: ALBUM_ITEM_HEIGHT,
    height: ALBUM_ITEM_HEIGHT,
  },
  ({ theme }) => ({
    borderRadius: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  }),
);

const AlbumInfo = styled.View({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexShrink: 1,
});

export const AlbumItem = ({
  album,
  onPress,
}: {
  album: Album;
  onPress: () => void;
}) => {
  return (
    <Container onPress={onPress}>
      <AlbumImage
        source={{
          uri: album.image.find(image => image.size === 'large')?.['#text'],
        }}
      />
      <AlbumInfo>
        <AlbumName preset="formLabel" size="md">
          {album.name}
        </AlbumName>
        <AlbumName
          preset="bold"
          size="sm"
          tx={'album:listeners'}
          txOptions={{
            amount: new Intl.NumberFormat().format(album.playcount),
          }}></AlbumName>
      </AlbumInfo>
    </Container>
  );
};

export const DummyAlbumItem = styled.View({
  height: ALBUM_ITEM_HEIGHT,
});
