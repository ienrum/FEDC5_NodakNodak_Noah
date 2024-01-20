import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Pagination from '@/components/common/Pagination';
import PostCard from '@/components/Main/PostList/PostCard';
import MainPageSpinner from '@/components/common/MainPageSpinner';
import { PostCardWrapper } from '@/components/Main/PostList/PostCard/style';
import { usePagination } from '@/hooks/usePagination';
import { useSelectedSearchedPostList } from '@/hooks/useSelectedSearchedPostList';
import { useSelectedPostListByChannelId } from '@/hooks/useSelectedPostListById';
import { useSelectedFullPostList } from '@/hooks/useSelectedFullPostList';
import { useDispatch } from '@/store';
import {
  getFullPostList,
  getPostListByChannelId,
} from '@/slices/postList/thunks';
import { searchPostData } from '@/slices/searchedData/thunk';

const PostList = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search');
  const { channelId } = useParams();

  const { searchedPostArray, isLoading: searchLoading } =
    useSelectedSearchedPostList();
  const { fullPostArray, isLoading: fullLoading } = useSelectedFullPostList();
  const { postArrayByChannelId, isLoading: channelLoading } =
    useSelectedPostListByChannelId();

  const isLoading = searchLoading || fullLoading || channelLoading;

  const filteredPostList = searchKeyword
    ? searchedPostArray
    : channelId
      ? postArrayByChannelId
      : fullPostArray;

  const { paginatedPostList, totalPage, currentPage, handlePageChange } =
    usePagination(filteredPostList, 9);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKeyword) {
      dispatch(searchPostData({ keyword: searchKeyword }));
      return;
    }
    if (channelId) {
      dispatch(getPostListByChannelId({ channelId }));
      return;
    }
    dispatch(getFullPostList());
  }, [dispatch, searchKeyword, channelId]);

  return (
    <>
      {isLoading ? (
        <MainPageSpinner />
      ) : (
        <PostCardWrapper>
          {paginatedPostList.map(({ _id, image, title, author, comments }) => (
            <PostCard
              key={_id}
              postId={_id}
              image={image}
              title={title}
              author={author}
              comments={comments}
            />
          ))}
        </PostCardWrapper>
      )}
      <Pagination
        page={currentPage}
        totalPage={totalPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PostList;
