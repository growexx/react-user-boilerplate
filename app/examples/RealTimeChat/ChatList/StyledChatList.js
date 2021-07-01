import styled from 'styled-components';
export const StyledChatList = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  flex-grow: 0;
  background: @primary-color;
`;

export const ChatListContainer = styled.div`
  height: 100vh;
  overflow: auto;
`;

export const SingleChatContainer = styled.div`
  padding: 50px;
  width: 300px;
  border-bottom: 1px solid @grey;
`;
