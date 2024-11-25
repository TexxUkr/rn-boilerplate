import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

const Container = styled.TouchableWithoutFeedback(
  {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    flex: 1,
    overflow: 'hidden',
  },
  ({ theme }) => ({
    padding: theme.spacing.xs,
  }),
);

const TextInputFrom = styled.TextInput(
  {
    flex: 1,
    fontSize: 16,
  },
  ({ theme }) => ({
    marginLeft: theme.spacing.sm,
    color: theme.colors.text,
  }),
);

const SearchBarContainer = styled.View<{ isFocused: boolean }>(
  {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
    paddingRight: 0,
    overflow: 'hidden',
  },
  ({ theme, isFocused }) => ({
    backgroundColor: isFocused
      ? theme.colors.palette.neutral100
      : theme.colors.palette.secondary100,
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.md,
  }),
);

const CloseIconContainer = styled.View({
  paddingRight: 20,
});

export type SearchBarProps = {
  focusHandler?: (isFocused: boolean) => {};
  searchPhrase?: string;
  setSearchPhrase?: (searchPhrase: string) => void;
  placeholder?: string;
  onSubmit?: (searchPhrase?: string) => void;
  dummy?: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchPhrase,
  setSearchPhrase = () => {},
  focusHandler = () => {},
  placeholder = 'Search',
  onSubmit = () => null,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [searchPhraseState, setSearchPhraseState] = useState<
    string | undefined
  >(searchPhrase);
  const [isFocused, setIsFocused] = useState(false);
  const onFocusHandler = useCallback(() => {
    setIsFocused(true);
    focusHandler(true);
  }, [focusHandler]);

  const onBlurHandler = useCallback(() => {
    setIsFocused(false);
    focusHandler(false);
    setSearchPhraseState(searchPhrase);
  }, [focusHandler]);

  const onSubmitHandler = () => {
    if (searchPhraseState === '') return;
    onSubmit(searchPhraseState);
  };

  const onChangeTextHandler = (text: string) => {
    setSearchPhraseState(text);
    setSearchPhrase(text);
  };
  const theme = useTheme();

  return (
    <Container onPress={() => inputRef.current?.focus()}>
      <SearchBarContainer isFocused={isFocused}>
        {/* search Icon */}
        <Icon name="search" size={20} color={theme.colors.text} />
        {/* Input field */}
        <TextInputFrom
          ref={inputRef}
          value={searchPhraseState}
          onChangeText={onChangeTextHandler}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text}
          onSubmitEditing={onSubmitHandler}
          returnKeyType={'go'}
        />
        {searchPhraseState !== '' && (
          <CloseIconContainer>
            <Icon
              name="close"
              size={20}
              color={theme.colors.text}
              onPress={() => {
                if (isFocused) setSearchPhraseState('');
              }}
            />
          </CloseIconContainer>
        )}
      </SearchBarContainer>
    </Container>
  );
};
export default SearchBar;
