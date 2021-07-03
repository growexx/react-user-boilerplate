import styled from 'styled-components';
export const StyledChatRoom = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  flex: 1;
  .chatRoomContainer {
    overflow: auto;
  }
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
    display: flex;
    margin: auto 5px 5px 5px;

    .ant-form-item {
      flex: 1;
      margin-bottom: 2px !important;
      margin-right: 10px !important;
    }
  }
  .messageContainer {
    display: flex;
    flex-direction: column;
    margin: 10px 5px 0 5px;
    p {
      padding: 10px;
      overflow: auto;
      height: auto;
    }
    .messageSent {
      margin-right: 10px;
      background-color: @messageSent;
      margin-left: auto;
    }
    .messageReceived {
      margin-left: 10px;
      margin-right: auto;
      background-color: @messageReceived;
    }
  }
`;
