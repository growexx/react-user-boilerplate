/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { NotificationWrapper } from './StyledNotification';

const Notification = () => (
  <NotificationWrapper>
    <BellOutlined />
  </NotificationWrapper>
);
export default Notification;
