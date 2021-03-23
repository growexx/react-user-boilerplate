import styled from 'styled-components';
import { colors, fontSizes, fontWeights, borders } from '../../../styles';
export const StyledRegistration = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .createAccount {
    text-align: center;
    font-size: ${fontSizes.f42};
    font-weight: ${fontWeights.bold};
    color: ${colors.brandPrimary};
  }
  .emailRegistration {
    color: ${colors.gray400};
    font-weight: ${fontWeights.regular};
    font-size: ${fontSizes.f14};
  }
  .registrationSubContainer {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .socialIcons {
    display: flex;
  }
  .socialIcons > span {
    border: 1px solid ${colors.gray500};
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
    margin-top: 35px;
    background: ${colors.brandPrimary};
    border: ${borders.avatarBorder};
    border-radius: 50px;
    text-align: center;
    color: ${colors.white};
    text-align: center;
    font-size: ${fontSizes.f15};
    font-weight: ${fontWeights.medium};
  }
`;
