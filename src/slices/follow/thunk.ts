import { name } from './constants';
import {
  CreateNotificationData,
  createNotification,
} from '../notification/thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

export const follow = createAsyncThunk(
  `${name}/follow`,
  async (
    {
      myId,
      token,
      userId,
    }: {
      myId: string;
      token: string;
      userId: string;
    },
    { getState, dispatch },
  ) => {
    const state = getState() as RootState;
    const myInfo = state.userInfo.authUser;

    if (!myInfo || myInfo._id !== myId) return;
    const { data } = await axios({
      url: `https://kdt.frontend.5th.programmers.co.kr:5003/follow/create`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
      },
    });

    const notificationData: CreateNotificationData = {
      notificationType: 'FOLLOW',
      notificationTypeId: data._id,
      userId,
      postId: null,
    };

    dispatch(
      createNotification({
        token,
        notificationData,
      }),
    );

    return data;
  },
);

export const unfollow = createAsyncThunk(
  `${name}/unfollow`,
  async (
    {
      myId,
      token,
      followId,
    }: {
      myId: string;
      token: string;
      followId: string;
    },
    { getState },
  ) => {
    const state = getState() as RootState;
    const myInfo = state.userInfo.authUser;

    if (!myInfo || myInfo._id !== myId) return;

    const { data } = await axios({
      url: `https://kdt.frontend.5th.programmers.co.kr:5003/follow/delete`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: followId,
      },
    });

    return data;
  },
);
