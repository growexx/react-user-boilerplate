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
  .anticon-bell {
    font-size: 18px;
    padding-right: 20px;
    @media screen and (max-width: 500px) {
      padding-right: 10px;
    }
  }
  .anticon-shopping-cart {
    font-size: 18px;
  }
`;
