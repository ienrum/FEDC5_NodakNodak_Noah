import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { InitialState, SearchedPost } from '@/slices/searchedData/type';
import { searchPostData, searchUserData } from '@/slices/searchedData/thunk';
import { SLICE_NAME } from '@/slices/constants';
import { initialSearchedPost, initialUser } from '@/slices/initialState';
import { User } from '@/types/APIResponseTypes';

const initialState: InitialState = {
  postData: [initialSearchedPost],
  userData: [initialUser],
  status: 'idle',
};

const searchedDataSlice = createSlice({
  name: SLICE_NAME.SEARCHED_DATA,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      searchPostData.fulfilled,
      (state, action: PayloadAction<SearchedPost[]>) => {
        state.postData = action.payload;
      },
    );
    builder.addCase(
      searchUserData.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.userData = action.payload;
      },
    );

    builder.addMatcher(
      isAnyOf(searchPostData.pending, searchUserData.pending),
      (state) => {
        state.status = 'loading';
        state.postData = [initialSearchedPost];
        state.userData = [initialUser];
      },
    );
    builder.addMatcher(
      isAnyOf(
        searchPostData.fulfilled,
        searchUserData.fulfilled,
        searchPostData.rejected,
        searchUserData.rejected,
      ),
      (state) => {
        state.status = 'idle';
      },
    );
  },
});

export default searchedDataSlice.reducer;
