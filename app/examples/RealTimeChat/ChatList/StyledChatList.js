import styled from 'styled-components';
export const StyledChatList = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  flex-grow: 0;
  flex: 1;
`;

export const ChatListContainer = styled.div`
  overflow: auto;
  .demo-infinite-container {
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const SingleChatContainer = styled.div`
  padding: 20px 0px 20px 20px;
  width: 300px;
  &:not(:last-child) {
    border-bottom: 1px solid @border-color-base;
  }
  display: flex;
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  p {
    margin-left: 20px;
    margin-bottom: 0px;
  }
`;
