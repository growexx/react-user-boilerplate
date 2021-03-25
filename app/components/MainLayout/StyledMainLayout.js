import styled from 'styled-components';
import { colors } from '../../styles/index';

export const StyledMainLayout = styled.div`
  .ant-layout-sider {
    background: ${colors.brandBackgroundPrimary};
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: ${colors.brandPrimary};
    color: ${colors.black};
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background: #001529;
    color: ${colors.white};
  }
  .ant-menu-dark .ant-menu-item,
  .ant-menu-dark .ant-menu-item-group-title,
  .ant-menu-dark .ant-menu-item > a,
  .ant-menu-dark .ant-menu-item > span > a {
    color: ${colors.black};
  }
  .sideBarTrigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    outline: none;
  }

  .sideBarTrigger:hover {
    color: ${colors.brandPrimary};
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .headerLayout {
    display: flex;
    padding: 0;
    background-color: white;
  }
`;

export const ToggleBreadCrumb = styled.div`
  display: flex;
`;
