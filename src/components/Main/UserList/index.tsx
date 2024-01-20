import { useEffect } from 'react';

import { Card, ScrollBar, Text } from '@/components/common';
import UserGroup from '@/components/Main/UserList/UserGroup';
import {
  useSelectedMyInfo,
  useSelectedMyInfoLoading,
} from '@/hooks/useSelectedMyInfo';
import { useDispatch } from '@/store';
import {
  useSelectedUserList,
  useSelectedUserListLoading,
} from '@/hooks/useSelectedUserList';
import { getMyInfo } from '@/slices/user/thunk';
import { getUserList } from '@/slices/userList/thunk';
import useInterval from '@/hooks/useInterval';

const UserList = () => {
  const dispatch = useDispatch();
  const myInfo = useSelectedMyInfo();
  const userList = useSelectedUserList();

  const isLoadingUserList = useSelectedUserListLoading();
  const isLoadingMyInfo = useSelectedMyInfoLoading();

  const isLoading = isLoadingUserList || isLoadingMyInfo;

  useEffect(() => {
    dispatch(getUserList());
    const token = localStorage.getItem('auth-token');
    if (!token) return;
    dispatch(getMyInfo());
  }, [dispatch]);

  useInterval(() => {
    dispatch(getUserList());
  }, 60000);

  const onlineUsers = userList.filter((user) => user.isOnline);
  const offlineUsers = userList.filter((user) => !user.isOnline);

  return (
    <Card
      width='223px'
      height='626px'
      shadowType='medium'
      style={{ marginTop: '96px' }}>
      <ScrollBar>
        {isLoading ? (
          <Text tagType='span' fontType='body2'>
            로딩중...
          </Text>
        ) : (
          <>
            <UserGroup title='온라인' userArray={onlineUsers} myInfo={myInfo} />
            <UserGroup
              title='오프라인'
              userArray={offlineUsers}
              myInfo={myInfo}
            />
          </>
        )}
      </ScrollBar>
    </Card>
  );
};

export default UserList;
