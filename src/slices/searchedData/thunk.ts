import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from '@/slices/constants';
import axiosInstance from '@/utils/customAxios';

export const searchPostData = createAsyncThunk(
  `${SLICE_NAME.SEARCHED_DATA}/searchPostData`,
  async ({ keyword }: { keyword: string }) => {
    const postKeyword = `"title":"[^"]*${keyword}[^"]*"|"content":"[^"]*${keyword}[^"]*"`;

    const { data } = await axiosInstance.get(`/search/all/${postKeyword}`);

    return data;
  },
);

export const searchUserData = createAsyncThunk(
  `${SLICE_NAME.SEARCHED_DATA}/searchUserData`,
  async ({ keyword }: { keyword: string }) => {
    const { data } = await axiosInstance.get(`/search/users/${keyword}`);

    return data;
  },
);
