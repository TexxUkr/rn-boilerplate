import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface UserState {
  isAuthed: boolean;
  loading?: boolean;
  error?: string | undefined;
}

export const initialState: UserState = {
  isAuthed: false,
  loading: false,
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedIn: state => {
      state.isAuthed = true;
    },
    userLoggedOut: state => {
      state.isAuthed = false;
    },
    userLoginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    userLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const userReducerActions = userSlice.actions;
export const userReducer = userSlice.reducer;
