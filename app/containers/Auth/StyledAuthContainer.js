import styled from 'styled-components';
import { colors, fontSizes, fontWeights, space, borders } from '../../styles';
export const StyledAuthContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  .sideContainer {
    background: ${colors.brandBackgroundPrimary};
    display: flex;
    flex-direction: row
    justify-content: flex-end;
    align-items: center;
    padding: ${space.xlSpacing};
    .registrationSideContainer {
      display: flex;
      flex-direction: column;
      align-items:center;
      .title {
        text-align: center;
        font-size: ${fontSizes.f42};
        font-weight: ${fontWeights.bold};
        margin: 0;
      }
      .subTitle {
        width: 60%;
        text-align: center;
        margin: 0;
      }
      button {
        margin-top: 35px;
        height: ${fontSizes.f40};
        width: 160px;
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
