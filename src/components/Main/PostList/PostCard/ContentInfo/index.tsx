import theme from '@/styles/theme';
import { Text } from '@/components/common';
import { ContentBox } from '@/components/Main/PostList/PostCard/ContentInfo/style';

interface ContentInfoProps {
  title: string;
  voteCount: number;
}

const ContentInfo = ({ title, voteCount }: ContentInfoProps) => {
  return (
    <ContentBox>
      <Text
        tagType='p'
        fontType='body2'
        colorType='black'
        style={{
          overflow: 'hidden',
          textOverflow: ' ellipsis',
          whiteSpace: 'nowrap',
          width: '260px',
        }}>
        {title}
      </Text>
      <Text tagType='span' fontType='caption' colorType='black'>
        {'총 '}
      </Text>
      <Text
        tagType='span'
        fontType='caption'
        colorType='primary'
        colorNumber={theme.isDark ? '200' : '400'}>
        {voteCount.toString()}
      </Text>
      <Text tagType='span' fontType='caption' colorType='black'>
        명 투표
      </Text>
    </ContentBox>
  );
};

export default ContentInfo;
