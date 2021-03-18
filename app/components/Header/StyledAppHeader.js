import styled from 'styled-components';

export const StyledAppHeader = styled.div`
  display: flex;
  flex: 1;
  line-height: 0;
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
  .ant-btn-group > .ant-btn:first-child {
    display: none;
  }
  .ant-dropdown-trigger {
    border-radius: 50% !important;
    background-color: #1890ff;
    color: white;
  }
  .ant-dropdown-trigger:hover {
    border-radius: 50% !important;
    background-color: #1890ff;
    color: white;
  }
`;
