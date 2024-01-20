import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 904px;
  gap: 16px;
`;
export const PostSnippetBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > img {
    padding-bottom: 4px;
  }
  & > *:not(img) {
    padding: 2px 12px;
  }
`;
