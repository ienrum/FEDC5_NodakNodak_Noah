import { useNavigate, useParams } from 'react-router-dom';

import { Text, Button } from '@/components/common';
import { ContentHeaderWrapper } from '@/components/Main/ContentHeader/style';
import { useSelectedChannel } from '@/hooks/useSelectedChannel';

const ContentHeader = () => {
  const { channelId } = useParams();
  const channel = useSelectedChannel();

  const channelTitle = (() => {
    const isChanneledPost = channelId && channel;
    const isFullPost = !isChanneledPost;

    if (isFullPost) return '전체 글';
    if (isChanneledPost) return channel.name;
    return '';
  })();

  const navigate = useNavigate();

  const handleWriteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(`/write/${channelId ? channelId : 'unselected'}`);
  };

  return (
    <ContentHeaderWrapper>
      <Text tagType='span' fontType='h2'>
        {channelTitle}
      </Text>
      <Button styleType='ghost' size='small' onClick={handleWriteClick}>
        글 쓰기
      </Button>
    </ContentHeaderWrapper>
  );
};

export default ContentHeader;
