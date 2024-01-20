import { User } from '@/types/APIResponseTypes';

export const makeGetIsFollowingAndFollow =
  (myInfo?: User) => (userId: string) =>
    myInfo
      ? myInfo.following.some(({ user }) => user === userId) &&
        myInfo.followers.some(({ follower }) => follower === userId)
      : false;
