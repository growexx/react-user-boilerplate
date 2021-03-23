import styled from 'styled-components';
import { colors, fontSizes, fontWeights, space, borders } from '../../styles';
export const StyledAuthContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  //   width: 40%;
  height: 100vh;
  .sideContainer {
    background: ${colors.brandBackgroundPrimary};
    display: flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    padding: 0 ${space.xlSpacing};
    .registrationSideContainer {
      display: flex;
      flex-direction: column;
      align-items:center;
      .title {
        text-align: center;
        font-size: ${fontSizes.f42};
        font-weight: ${fontWeights.bold};
      }
      .subTitle {
        width: 60%;
        text-align: center;
      }
      button {
        margin-top: 35px;
        background: ${colors.transparent};
        border: ${borders.avatarBorder};
        border-radius: 50px;
        text-align: center;
        color: ${colors.white};
      }
      button:hover {
        color: ${colors.white};
      }
      color: ${colors.white};
    }
  }
`;
