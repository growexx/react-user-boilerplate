import styled from 'styled-components';
import { colors, fontSizes, fontWeights, borders } from '../../../styles';
export const StyledLogin = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  .createAccount {
    margin: 0;
    text-align: center;
    font-size: ${fontSizes.f42};
    font-weight: ${fontWeights.bold};
    color: ${colors.brandPrimary};
  }
  .emailLogin {
    margin-top: ${fontSizes.f31};
    color: ${colors.gray400};
    font-weight: ${fontWeights.regular};
    font-size: ${fontSizes.f14};
    text-align: center;
  }
  .LoginSubContainer {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
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
      height: ${fontSizes.f40};
    }
    input[value] {
      color: ${colors.gray400};
      font-size: ${fontSizes.f15};
    }
  }
  button {
    margin-top: ${fontSizes.f31};
    background: ${colors.brandPrimary};
    border: ${borders.avatarBorder};
    border-radius: 50px;
    text-align: center;
    color: ${colors.white};
    text-align: center;
    font-size: ${fontSizes.f15};
    font-weight: ${fontWeights.medium};
    height: ${fontSizes.f40};
    width: 160px;
  }
  button:hover {
    background: ${colors.brandPrimary};
    border: ${borders.avatarBorder};
    color: ${colors.white};
  }
  button:focus {
    background: ${colors.brandPrimary};
    border: ${borders.avatarBorder};
    color: ${colors.white};
  }
`;
