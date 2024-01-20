import { Title } from '@/components/Main/UserList/UserGroup/style';
import { UserSnippetGroupProps } from '@/components/Main/UserList/UserGroup/type';
import UserSnippet from '@/components/Main/UserList/UserGroup/UserSnippet';
import { makeGetIsFollowingAndFollow } from '@/components/Main/utils';

const UserGroup = ({ title, userArray, myInfo }: UserSnippetGroupProps) => {
  const getIsFollowingAndFollow = makeGetIsFollowingAndFollow(myInfo);
  const userCount = userArray.length;

  return (
    <>
      {title && <Title>{`${title} - ${userCount}`}</Title>}
      {userArray.map(({ fullName, image, isOnline, _id }) => (
        <UserSnippet
          text={fullName}
          image={image}
          isFollowing={getIsFollowingAndFollow(_id)}
          isOnline={isOnline}
          userId={_id}
          key={_id}
        />
      ))}
    </>
  );
};

export default UserGroup;
