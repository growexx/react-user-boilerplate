import React from 'react';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

export const MenuItems = [
  {
    to: '/',
    tabName: 'Home',
    icon: <UserOutlined />,
  },
  {
    to: '/features',
    tabName: 'Features',
    icon: <VideoCameraOutlined />,
  },
];
