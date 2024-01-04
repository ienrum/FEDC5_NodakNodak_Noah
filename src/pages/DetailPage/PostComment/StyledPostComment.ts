import styled from 'styled-components';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  gap: 16px;

  > * {
    margin: 0;
  }
`;
