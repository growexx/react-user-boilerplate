import styled from 'styled-components';
import { colors } from '../../styles';
export const AvatarWrapper = styled.div`
  .ant-btn-group > .ant-btn:first-child {
    display: none;
  }
  .ant-dropdown-trigger,
  .ant-dropdown-trigger:hover {
    border-radius: 50% !important;
    background-color: ${colors.brandPrimary};
    color: white;
  }
`;
