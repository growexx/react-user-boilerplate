import styled from 'styled-components';
export const StyledRealTimeChat = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  .searchContainer {
    margin-bottom: 20px;
    .ant-select {
      display: flex;
    }
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: row;
  height: 100vh;
  border: 1px solid @border-color-base;
`;
