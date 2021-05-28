import styled from 'styled-components';

export const StyledAppHeader = styled.div`
  display: flex;
  flex: 1;
  line-height: 0;
  background-color: ${props => (props.menuBackground ? '#190426' : null)};
  color: ${props => (props.menuBackground ? 'white' : null)};
`;

export const AvatarWrapper = styled.div`
  margin-left: auto;
  margin-right: 16px;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  .anticon-bell {
    font-size: 18px;
    padding-right: 20px;
  }
`;
