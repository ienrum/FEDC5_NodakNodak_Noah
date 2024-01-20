import { UserSnippetBox } from '@/components/Main/style';
import { Avatar, Text } from '@/components/common';

interface UserInfoProps {
  name: string;
  avatar: string;
  onClick: () => void;
}

const UserInfo = ({ name, avatar, onClick: handleClick }: UserInfoProps) => {
  return (
    <UserSnippetBox onClick={handleClick}>
      <Avatar size='mini' src={avatar} alt={name} />
      <Text tagType='span' fontType='caption' colorType='black'>
        {name ? name : 'loading...'}
      </Text>
    </UserSnippetBox>
  );
};

export default UserInfo;
