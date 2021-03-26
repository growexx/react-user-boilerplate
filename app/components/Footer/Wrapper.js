import styled from 'styled-components';
import { colors, fontSizes, fontWeights } from '../../styles/index';
const Wrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  background: ${colors.blackPearl};
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.f14};
  color: ${colors.white};
  padding: ${fontSizes.f14} 0;
  font-weight: ${fontWeights.bold};
  > section:first-child {
    margin-left: ${fontSizes.f8};
  }
  > section:nth-child(2) {
    margin-right: ${fontSizes.f8};
    option {
      color: ${colors.black};
    }
    @media only screen and (max-width: 767px) {
      margin-top: ${fontSizes.f12};
    }
  }
`;

export default Wrapper;
