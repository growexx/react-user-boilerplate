import styled from 'styled-components';

export const StyledMainLayout = styled.div`
  .sideBarTrigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .sideBarTrigger:hover {
    color: #1890ff;
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
