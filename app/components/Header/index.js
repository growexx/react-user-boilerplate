/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-redeclare */
import React from 'react';
import { PageHeader, Row } from 'antd';
class Header extends React.Component {
  render() {
    // const DropdownMenu = () => (
    //   <Dropdown key="more" overlay={menu}>
    //     <Button
    //       style={{
    //         border: 'none',
    //         padding: 0,
    //       }}
    //     >
    //       <EllipsisOutlined
    //         style={{
    //           fontSize: 20,
    //           verticalAlign: 'top',
    //         }}
    //       />
    //     </Button>
    //   </Dropdown>
    // );

    // const IconLink = ({ src, text }) => (
    //   <a className="example-link">
    //     <img className="example-link-icon" src={src} alt={text} />
    //     {text}
    //   </a>
    // );

    const Content = ({ children, extraContent }) => (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
      </Row>
    );

    // const { Paragraph } = Typography;

    // const menu = (
    //   <Menu>
    //     <Menu.Item>
    //       <a
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         href="http://www.alipay.com/"
    //       >
    //         1st menu item
    //       </a>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <a
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         href="http://www.taobao.com/"
    //       >
    //         2nd menu item
    //       </a>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <a
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         href="http://www.tmall.com/"
    //       >
    //         3rd menu item
    //       </a>
    //     </Menu.Item>
    //   </Menu>
    // );

    return (
      <PageHeader
        title="Title"
        className="site-page-header"
        subTitle="This is a subtitle"
        avatar={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
      >
        <Content
          extraContent={
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
              alt="content"
              width="100%"
            />
          }
        >
          {/* {content} */}hi
        </Content>
      </PageHeader>
    );
  }
}

export default Header;
