import styled from 'styled-components';
import { colors, fontWeights } from '../../../styles';
export const StyledRegistration = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .createAccount {
    margin: 0;
    text-align: center;
    font-size: @font-size-lg+26;
    font-weight: ${fontWeights.bold};
    color: ${colors.brandPrimary};
  }
  .emailRegistration {
    margin-top: @font-size-lg+15;
    color: ${colors.gray400};
    font-weight: ${fontWeights.regular};
    font-size: @font-size-base;
    text-align: center;
  }
  .registrationSubContainer {
    width: 50%;
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
    border: 1px solid ${colors.gray300};
    padding: 10px;
    border-radius: 50%;
    margin: 10px;
  }
  .accountData {
    input {
      margin-top: 10px;
      background-color: ${colors.gray200};
    }
    input[value] {
      color: ${colors.gray400};
      font-size: @font-size-base+1px;
    }
  }
  button {
    margin-top: @font-size-lg+15;
    background: ${colors.brandPrimary};
    border: 2px solid @white;
    border-radius: @border-radius-base+48;
    text-align: center;
    color: @white;
    text-align: center;
    font-size: @font-size-lg-15;
    font-weight: ${fontWeights.medium};
    height: @font-size-lg+24;
    width: 160px;
  }
  button:hover {
    background: ${colors.brandPrimary};
    border: 2px solid @white;
    color: @white;
  }
  button:focus {
    background: ${colors.brandPrimary};
    border: 2px solid @white;
    color: @white;
  }
`;
