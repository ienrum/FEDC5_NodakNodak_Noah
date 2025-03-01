import { useNavigate } from 'react-router-dom';

import { UserSnippetBox } from '@/components/Main/style';
import { Avatar, OnLineBadge } from '@/components/common';
import { UserSnippetProps } from '@/components/Main/UserList/UserGroup/UserSnippet/type';

const UserSnippet = ({
  isOnline,
  handleClick,
  image,
  text,
  isFollowing,
  userId,
  ...props
}: UserSnippetProps) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <UserSnippetBox
      onClick={handleClick || handleUserClick}
      style={{ ...props.style }}>
      <OnLineBadge isOnline={isOnline} isFollowing={isFollowing}>
        <Avatar src={image} alt={text} size='small' />
      </OnLineBadge>
      {text}
    </UserSnippetBox>
  );
};

export default UserSnippet;
