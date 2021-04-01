import styled from 'styled-components';
import { borders, colors, fontSizes, fontWeights } from '../../styles';

export const StyledHeader = styled.p`
  text-align: center;
  font-weight: ${fontWeights.bold};
  color: ${colors.purpleBlack};
`;

export const StyledInput = styled.div`
  margin: ${fontSizes.f31} ${fontSizes.f18};
`;

export const StyledTableContainer = styled.div`
  margin: ${fontSizes.f31} ${fontSizes.f18};
  display: flex;
  flex-direction: column;
  padding: ${fontSizes.f10};
  border: ${borders.baseBorder};
  p:first-child {
    font-weight: ${fontWeights.bold};
    margin-top: ${fontSizes.f10};
    font-size: ${fontSizes.f22};
  }
  p:nth-child(2) {
    font-weight: ${fontWeights.medium};
    color: ${colors.gray500};
  }
`;

export const StyledFormatHeader = styled.div`
  margin: ${fontSizes.f31} ${fontSizes.f18};
  display: flex;
  flex-direction: column;
  padding: ${fontSizes.f10};
  p:first-child {
    font-weight: ${fontWeights.bold};
    margin-top: ${fontSizes.f10};
    font-size: ${fontSizes.f22};
  }
  p:nth-child(2) {
    margin-top: 0px;
    font-weight: ${fontWeights.medium};
    color: ${colors.gray500};
  }
`;
