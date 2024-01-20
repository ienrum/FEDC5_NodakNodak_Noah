import { useSelector } from 'react-redux';

import { RootState } from '@/store';

export const useSelectedFullPostList = () => {
  const fullPostArray = useSelector(
    (state: RootState) => state.postList.fullPosts,
  );
  const isLoading = useSelector(
    (state: RootState) => state.postList.status === 'loading',
  );
  const isError = useSelector(
    (state: RootState) => state.postList.status === 'failed',
  );

  return { fullPostArray, isLoading, isError };
};
