import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { RootState, useDispatch } from '@/store';
import {
  getFullPostList,
  getPostListByChannelId,
} from '@/slices/postList/thunks';
import { useSelectedStatus } from '@/hooks/useSelectedStatus';
import { StatusType } from '@/slices/type';

// import { LIMIT } from '@/slices/postList';
const LIMIT = 3;
const COUNT_AT_ONCE = 3;

export const useFetchChannelPosts = (channelId: string | undefined) => {
  const dispatch = useDispatch();
  const fullChannelStatus = useSelectedStatus('get', '/posts');
  const [fetchStatus, setFetchStatus] = useState<StatusType | 'stop'>('idle');
  const posts = useSelector((state: RootState) => state.postList.fullPosts);

  const getFullPostFetchList = useMemo(
    () =>
      Array.from(
        { length: COUNT_AT_ONCE },
        (_, i) => () =>
          dispatch(
            getFullPostList({
              offset: posts.length === 0 ? LIMIT * i : posts.length + LIMIT * i,
              limit: LIMIT,
            }),
          ),
      ),
    [dispatch, posts.length],
  );

  useEffect(() => {
    if (channelId) return;
    if (fetchStatus !== 'idle') return;

    const asyncAllFullPostFetchList = async () => {
      setFetchStatus('loading');
      const postsList = await Promise.all(
        getFullPostFetchList.map((fetch) => fetch().unwrap()),
      );
      const posts = postsList.flat();
      if (posts.length < COUNT_AT_ONCE * LIMIT) {
        setFetchStatus('stop');
        return;
      }
      setFetchStatus('idle');
    };

    asyncAllFullPostFetchList();
  }, [dispatch, channelId, getFullPostFetchList, fetchStatus, posts.length]);

  useEffect(() => {
    if (!channelId) return;
    dispatch(getPostListByChannelId({ channelId }));
  }, [dispatch, channelId]);

  return { fullChannelStatus, posts };
};
