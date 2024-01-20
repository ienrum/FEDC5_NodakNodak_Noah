import { createAsyncThunk } from '@reduxjs/toolkit';

import { SLICE_NAME } from '@/slices/constants';
import axiosInstance from '@/utils/customAxios';
import {
  GetPostsByChannelIdParams,
  GetPostsByUserIdParams,
} from '@/slices/postList/type';
import { Post } from '@/types/APIResponseTypes';

export const getPostListByChannelId = createAsyncThunk<
  [string, Post[]],
  GetPostsByChannelIdParams
>(
  `${SLICE_NAME.POST_LIST}/getPostListByChannelId`,
  async ({ channelId, offset, limit }) => {
    const queries = paginationCalculator(offset, limit);

    const { data } = await axiosInstance.get<Post[]>(
      `posts/channel/${channelId}/${queries}`,
    );

    return [channelId, data];
  },
);

export const getPostListByUserId = createAsyncThunk<
  Post[],
  GetPostsByUserIdParams
>(
  `${SLICE_NAME.POST_LIST}/getPostListByUserId`,
  async ({ userId, offset, limit }: GetPostsByUserIdParams) => {
    const queries = paginationCalculator(offset, limit);

    const { data } = await axiosInstance.get<Post[]>(
      `posts/author/${userId}/${queries}`,
    );

    return data;
  },
);

const paginationCalculator = (offset?: number, limit?: number) => {
  if (offset === undefined || limit === undefined) {
    return '';
  }

  return `?offset=${offset}&limit=${limit}`;
};

export const getFullPostList = createAsyncThunk<Post[]>(
  `${SLICE_NAME.POST_LIST}/getFullPostList`,
  async () => {
    const { data } = await axiosInstance.get<Post[]>(`posts/`);

    return data;
  },
);

export const getPostListByMyId = createAsyncThunk<
  Post[],
  { offset?: number; limit?: number }
>(`${SLICE_NAME.POST_LIST}/getPostListByMyId`, async ({ offset, limit }) => {
  const queries = paginationCalculator(offset, limit);
  const {
    data: { _id: userId },
  } = await axiosInstance.get('auth-user');
  const { data } = await axiosInstance.get<Post[]>(
    `posts/author/${userId}/${queries}`,
  );

  return data;
});
