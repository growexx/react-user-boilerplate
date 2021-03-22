/*
 * Header Constants
 * This file contains constants used in Header component.
 */
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const MenuItems = [
  {
    to: '/profile',
    tabName: 'Profile',
    icon: <UserOutlined />,
  },
  {
    to: '/logout',
    tabName: 'Logout',
    icon: <LockOutlined />,
  },
];
