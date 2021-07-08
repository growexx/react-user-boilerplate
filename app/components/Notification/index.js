/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React, { useEffect, useState } from 'react';
import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { NotificationWrapper } from './StyledNotification';
import CartDrawer from '../CartDrawer';

const Notification = () => {
  const productCount = JSON.parse(localStorage.products || '[]').length;
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(productCount);
  const onClickHandler = () => {
    setVisible(true);
  };

  useEffect(() => {
    window.setCount = setCount;
    window.addEventListener('storage', () => {
      setCount(JSON.parse(localStorage.getItem('products')).length || []);
    });
    return () => {
      window.removeEventListener('storage', window);
    };
  }, []);

  useEffect(() => {
    setCount((window.product || []).length);
  }, [window.product]);
  return (
    <NotificationWrapper>
      <div className="u-mr-3 u-d-inline-block">
        <Button
          onClick={onClickHandler}
          type="text"
          data-testid="badge-notification"
        >
          <Badge count={count} size="small">
            <ShoppingCartOutlined className="u-font-size-lg" />
          </Badge>
        </Button>
      </div>
      <BellOutlined />
      <div data-testid="badge-cart-drawer" data-visible={visible}>
        <CartDrawer visible={visible} setVisible={setVisible} />
      </div>
    </NotificationWrapper>
  );
};
export default Notification;
