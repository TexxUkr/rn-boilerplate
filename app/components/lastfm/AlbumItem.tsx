import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { Text } from '@/components';

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
    width: 80,
    height: 80,
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
  album: AlbumResponse;
  onPress: () => void;
}) => {
  return (
    <Container>
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
