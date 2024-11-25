import { FC } from 'react';
import { View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useAppTheme } from '@/utils/useAppTheme';
import styled from '@emotion/native';
import { SearchBar, SearchBarProps } from '@/components/SearchBar/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InputContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  marginHorizontal: 10,
});

export const SearchBarHome: FC<SearchBarProps> = ({
  searchPhrase,
  onSubmit,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 10 }}>
      <InputContainer>
        <SearchBar searchPhrase={searchPhrase} onSubmit={onSubmit} />
      </InputContainer>
    </View>
  );
};

const Header = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
});

export const DummySearchBarContainer = styled.View({ opacity: 0 });

export const HomeScreenHeader: FC<SearchBarProps> = props => {
  const { theme } = useAppTheme();
  return (
    <>
      <Header>
        <BlurView blurType={theme.isDark ? 'dark' : 'light'}>
          <DummySearchBarContainer pointerEvents="none">
            <SearchBarHome />
          </DummySearchBarContainer>
        </BlurView>
      </Header>
      <Header>
        <SearchBarHome {...props} />
      </Header>
    </>
  );
};
