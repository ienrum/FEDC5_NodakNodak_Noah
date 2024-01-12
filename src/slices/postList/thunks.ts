import { name } from './constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/customAxios';
import {
  GetPostsByChannelIdParams,
  GetPostsByUserIdParams,
} from '@/slices/postList/type';

export const getPostListByChannelId = createAsyncThunk(
  `${name}/getPostListByChannelId`,
  async ({ channelId, offset, limit }: GetPostsByChannelIdParams) => {
    const queries = paginationCalculator(offset, limit);

    const { data } = await axiosInstance.get(
      `posts/channel/${channelId}/${queries}`,
    );

    return data;
  },
);

export const getPostListByUserId = createAsyncThunk(
  `${name}/getPostListByUserId`,
  async ({ userId, offset, limit }: GetPostsByUserIdParams) => {
    const queries = paginationCalculator(offset, limit);

    const { data } = await axiosInstance.get(
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

export const getFullPostList = createAsyncThunk(
  `${name}/getFullPostList`,
  async () => {
    const { data } = await axiosInstance.get('/posts');

    return data;
  },
);

export const getPostListByMyId = createAsyncThunk(
  `${name}/getPostListByMyId`,
  async () => {
    const {
      data: { _id: userId },
    } = await axiosInstance.get('auth-user');
    const { data } = await axiosInstance.get(`posts/author/${userId}/`);

    return data;
  },
);
