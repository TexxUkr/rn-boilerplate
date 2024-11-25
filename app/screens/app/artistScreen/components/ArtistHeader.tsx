import { FC } from 'react';
import { Header, HeaderProps } from '@/components';
import { BlurView } from '@react-native-community/blur';
import { useAppTheme } from '@/utils/useAppTheme';
import styled from '@emotion/native';

export const ArtistHeader: FC<HeaderProps> = props => {
  return (
    <Header containerStyle={{ backgroundColor: 'transparent' }} {...props} />
  );
};

const HeaderContainer = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export const DummyContainer = styled.View({ opacity: 0, marginBottom: 10 });

export const ArtistBlurHeader: FC<HeaderProps> = props => {
  const { theme } = useAppTheme();
  return (
    <>
      <HeaderContainer>
        <BlurView blurType={theme.isDark ? 'dark' : 'light'}>
          <DummyContainer pointerEvents="none">
            <ArtistHeader {...props} />
          </DummyContainer>
        </BlurView>
      </HeaderContainer>
      <HeaderContainer>
        <ArtistHeader {...props} />
      </HeaderContainer>
    </>
  );
};
