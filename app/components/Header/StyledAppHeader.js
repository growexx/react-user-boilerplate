import styled from 'styled-components';

export const StyledAppHeader = styled.div`
  display: flex;
  flex: 1;
  line-height: 0;
`;

export const StyledAppHeaderColored = styled.div`
  display: flex;
  flex: 1;
  line-height: 0;
  background-color: #190426;
  color: white !important;
`;

export const AvatarWrapper = styled.div`
  margin-left: auto;
  margin-right: 16px;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  .anticon-shopping-cart {
    font-size: 18px;
  }
`;
