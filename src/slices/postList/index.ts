import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { InitialState } from '@/slices/postList/type';
import { SLICE_NAME } from '@/slices/constants';
import {
  getPostListByChannelId,
  getPostListByUserId,
  getFullPostList,
  getPostListByMyId,
} from '@/slices/postList/thunks';
import { initialPost } from '@/slices/initialState';
import { Post } from '@/types/APIResponseTypes';

export const LIMIT = 3;

const initialState: InitialState = {
  posts: [],
  postListByChannelId: [initialPost],
  postListByUserId: [initialPost],
  postListByMyId: [initialPost],
  fullPosts: [],
  status: 'idle',
};

const postSlice = createSlice({
  name: SLICE_NAME.POST_LIST,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPostListByChannelId.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.postListByChannelId = action.payload;
      },
    );
    builder.addCase(
      getPostListByUserId.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.postListByUserId = action.payload;
      },
    );
    builder.addCase(
      getFullPostList.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        if (
          action.payload[0] &&
          state.fullPosts.find((post) => post._id === action.payload[0]._id)
        )
          return;
        if (state.fullPosts.length === 1) {
          state.fullPosts = action.payload;
          return;
        }
        state.fullPosts.push(...action.payload);
      },
    );
    builder.addCase(getPostListByMyId.fulfilled, (state, action) => {
      state.postListByMyId = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        getPostListByChannelId.pending,
        getPostListByUserId.pending,
        getFullPostList.pending,
      ),
      (state) => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      isAnyOf(
        getPostListByChannelId.fulfilled,
        getPostListByUserId.fulfilled,
        getPostListByChannelId.rejected,
        getPostListByUserId.rejected,
        getFullPostList.fulfilled,
        getFullPostList.rejected,
      ),
      (state) => {
        state.status = 'idle';
      },
    );
  },
});

export default postSlice.reducer;
