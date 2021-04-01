import styled from 'styled-components';
export const AvatarWrapper = styled.div`
  .ant-btn-group > .ant-btn:first-child {
    display: none;
  }
  .ant-dropdown-trigger,
  .ant-dropdown-trigger:hover {
    border-radius: 50% !important;
    background-color: @primary-color;
    color: white;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    border-color: @primary-hover;
  }
`;
