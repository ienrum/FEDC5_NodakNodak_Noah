import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Post } from '@/types/APIResponseTypes';

export const useSelectedPostListByUserId = () =>
  useSelector((state: RootState) => state.postList.postListByUserId);

export const useSelectedPostListByChannelId = () => {
  const postArrayByChannelId = useSelector<RootState, Post[]>(
    (state) => state.postList.posts,
  );
  const isLoading = useSelector<RootState, boolean>(
    (state) => state.postList.status === 'loading',
  );
  const isError = useSelector<RootState, boolean>(
    (state) => state.postList.status === 'failed',
  );

  return { postArrayByChannelId, isLoading, isError };
};

export const useSelectedPostListByMyId = () =>
  useSelector((state: RootState) => state.postList.postListByMyId);
