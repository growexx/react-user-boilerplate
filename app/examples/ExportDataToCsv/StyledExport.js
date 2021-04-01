import styled from 'styled-components';
import { fontSizes } from '../../styles';
export const StyledExport = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: ${fontSizes.f12};
  }
`;

export const StyledButton = styled.div`
  align-self: flex-end;
`;
