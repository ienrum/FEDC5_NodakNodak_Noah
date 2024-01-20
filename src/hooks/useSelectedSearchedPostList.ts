import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useSelectedSearchedPostList = () => {
  const searchedPostArray = useSelector(
    (state: RootState) => state.searchedData.postData,
  );
  const isLoading = useSelector(
    (state: RootState) => state.searchedData.status === 'loading',
  );
  const isError = useSelector(
    (state: RootState) => state.searchedData.status === 'failed',
  );

  return { searchedPostArray, isLoading, isError };
};
