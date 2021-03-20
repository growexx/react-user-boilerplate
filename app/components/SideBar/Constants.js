/*
 * Sidebar Constants
 * This file contains constants used in Sidebar component.
 */

import React from 'react';
import {
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined,
} from '@ant-design/icons';

export const MenuItems = [
  {
    to: '/',
    tabName: 'Home',
    icon: <UserOutlined />,
  },
  {
    to: '/features',
    tabName: 'Features',
    icon: <CheckCircleOutlined />,
  },
  {
    to: '/font-awesome',
    tabName: 'Font Awesome Demo',
    icon: <SmileOutlined />,
  },
];
