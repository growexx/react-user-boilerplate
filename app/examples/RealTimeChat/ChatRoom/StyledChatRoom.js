import styled from 'styled-components';
export const StyledChatRoom = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  flex: 1;
  .chatRoomHeader {
    background: @primary-color;
    color: @white;
    font-weight: bold;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    img {
      border-radius: 50%;
      height: 50px;
      width: 50px;
      background: @white;
    }
  }
  .messageInput {
    margin-top: auto;
    .ant-form-item {
      margin-bottom: 2px !important;
    }
  }
`;
