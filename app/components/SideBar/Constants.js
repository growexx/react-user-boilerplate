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
import { ROUTES } from '../../containers/Auth/constants';

export const MenuItems = [
  {
    to: ROUTES.HOME,
    tabName: 'Home',
    icon: <UserOutlined />,
  },
  {
    to: ROUTES.FEATURES,
    tabName: 'Features',
    icon: <CheckCircleOutlined />,
  },
  {
    to: ROUTES.FONTAWESOME,
    tabName: 'Font Awesome Demo',
    icon: <SmileOutlined />,
  },
];
