import styled from 'styled-components';
import { colors } from '../../styles/index';

export const StyledMainLayout = styled.div`
  .ant-layout-sider {
    transition: none;
    background: @primary-color;
  }
  .ant-menu .ant-menu-item,
  .ant-menu-submenu-title,
  .ant-menu {
    transition: none;
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    background-color: @primary-color;
    color: @secondary-color;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-item-selected {
    background-color: @secondary-color;
    color: ${colors.white};
  }
  .ant-menu-dark .ant-menu-item,
  .ant-menu-dark .ant-menu-item-group-title,
  .ant-menu-dark .ant-menu-item > a,
  .ant-menu-dark .ant-menu-item > span > a {
    color: ${colors.black};
  }
  .ant-menu-item-selected > span > a {
    color: ${colors.white} !important;
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
    color: @primary-color;
  }
  #components-layout-demo-custom-trigger .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin: 20px;
    }
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
