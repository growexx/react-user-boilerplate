import styled from 'styled-components';
export const StyledChatList = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  @media only screen and (min-width: 767px) {
    border-right: 1px solid @border-color-base;
  }
`;

export const ChatListContainer = styled.div`
  overflow: auto;
  .demo-infinite-container {
    border-radius: 4px;
    border-bottom: 1px solid @border-color-base;
    button {
      border: none;
      color: @primary-color;
      box-shadow: none;
    }
  }
  .searchBar {
    margin-top: 10px;
    .ant-select {
      width: 80%;
    }
    margin-bottom: 0;
  }
`;

export const SingleChatContainer = styled.div`
  padding: 20px 0px 20px 20px;
  width: 300px;
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
  .ant-list-item-meta-description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
