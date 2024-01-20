import { useNavigate } from 'react-router-dom';

import {
  ButtonWrapper,
  PostSnippetBox,
} from '@/components/Main/PostList/PostCard/style';
import { Button, Card } from '@/components/common';
import { PostCardProps } from '@/components/Main/PostList/PostCard/type';
import { useSelectedChannel } from '@/hooks/useSelectedChannel';
import ContentInfo from '@/components/Main/PostList/PostCard/ContentInfo';
import UserInfo from '@/components/Main/PostList/PostCard/UserInfo';
import { resizeImage } from '@/utils/resizeImage';

const PostCard = ({
  image,
  title,
  author,
  postId,
  comments,
}: PostCardProps) => {
  const { fullName, _id: userId, image: avatar } = author;

  const parsedTitle = JSON.parse(title).title;

  const voteCount = comments.filter((comment) => {
    const parsedComment = JSON.parse(comment.comment);

    return parsedComment.type === 'vote';
  }).length;

  const channel = useSelectedChannel();
  const navigate = useNavigate();

  const handleSeeUserInfo = () => {
    navigate(`/user/${userId}`);
  };

  const handleSeeDetail = () => {
    navigate(`/detail/${channel?._id}/${postId}`);
  };

  const handleSeeResult = () => {
    navigate(`/detail/${channel?._id}/${postId}/result`);
  };

  return (
    <Card width='280px' height='280px' shadowType='medium'>
      <PostSnippetBox>
        <img
          width='280px'
          height='146px'
          src={image ? resizeImage(image, 280) : '/DefaultImage.webp'}
          onClick={handleSeeDetail}
          style={{ cursor: 'pointer' }}
          alt={postId}
        />
        <ContentInfo title={parsedTitle} voteCount={voteCount} />
        <UserInfo name={fullName} avatar={avatar} onClick={handleSeeUserInfo} />
      </PostSnippetBox>
      <ButtonWrapper>
        <Button styleType='primary' onClick={handleSeeDetail}>
          자세히 보기
        </Button>
        <Button styleType='ghost' onClick={handleSeeResult}>
          결과 보기
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

export default PostCard;
