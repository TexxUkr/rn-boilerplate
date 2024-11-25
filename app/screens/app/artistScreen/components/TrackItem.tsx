import styled from '@emotion/native';
import { Text } from '@/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppTheme } from '@/utils/useAppTheme';
import { secondsToDuration } from '@/utils/duration';

export const ITEM_HEIGHT = 80;

const Container = styled.View(
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

const TrackName = styled(Text)({});

const TrackInfoContainer = styled.View({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexShrink: 1,
});

const IconContainer = styled.View({
  width: ITEM_HEIGHT,
  height: ITEM_HEIGHT,
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
});

export const TrackItem = ({ track }: { track: Track }) => {
  const { theme } = useAppTheme();
  const durationDate = new Date(track.duration * 1000);
  return (
    <Container>
      <IconContainer>
        <Icon
          name="music"
          size={ITEM_HEIGHT / 2}
          color={theme.colors.palette.secondary500}
        />
      </IconContainer>
      <TrackInfoContainer>
        <TrackName preset="formLabel" size="md">
          {track.name}
        </TrackName>
        <TrackName
          preset="bold"
          size="sm"
          text={secondsToDuration(track.duration)}
        />
      </TrackInfoContainer>
    </Container>
  );
};

export const TrackItemSkeleton = () => {
  return <Container></Container>;
};

export const DummyTrackItem = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  flex: 1,
  height: ITEM_HEIGHT,
});
