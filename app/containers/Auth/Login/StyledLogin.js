import styled from 'styled-components';
export const StyledLogin = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .createAccount {
    margin: 0;
    text-align: center;
    font-size: @font-size-lg+26;
    font-weight: @font-weight-bold;
    color: @primary-color;
  }
  .emailLogin {
    margin-top: 31px;
    color: @text-color;
    font-weight: @font-weight-regular;
    font-size: @font-size-base;
    text-align: center;
  }
  .LoginSubContainer {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 767px) {
      width: 80%;
    }
  }
  .socialIcons {
    display: flex;
  }
  .socialIcons > span {
    border: 1px solid @border-color-base;
    padding: 10px;
    border-radius: 50%;
    margin: 10px;
  }
  .accountData {
    .ant-input:focus,
    .ant-input:focused,
    .ant-input:hover {
      border-color: @primary-hover;
    }
    > span:hover,
    > span:focus > span:visited {
      border-color: @border-color-base;
    }
    > div:nth-child(2) {
      margin-top: 10px;
    }
    .ant-input-password {
      background-color: @background-color-base;
    }
    > input:first-child {
      margin-top: 10px;
    }
    input {
      background-color: @background-color-base;
    }
    input[value] {
      color: @text-color-secondary;
      font-size: @font-size-base+1px;
    }
  }
  button {
    margin-top: 31px;
    background: @primary-color;
    border: 2px solid @white;
    border-radius: 50px;
    text-align: center;
    color: @white;
    text-align: center;
    font-size: @font-size-base+1;
    font-weight: @font-weight-medium;
    height: @height-lg;
    width: 160px;
  }
  button:hover {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
  button:focus {
    background: @primary-color;
    border: 2px solid @white;
    color: @white;
  }
`;
