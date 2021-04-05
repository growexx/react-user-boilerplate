/*
 * Sidebar Constants
 * This file contains constants used in Sidebar component.
 */

import React from 'react';
import {
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined,
  LoadingOutlined,
  ExportOutlined,
  NumberOutlined,
  FormOutlined,
  LockOutlined,
} from '@ant-design/icons';
import {
  ROUTES,
  ROLE_BASED_SIDEBAR_MENU,
  ROLES,
  RESTRICTED_ROUTES,
} from 'containers/constants';

export const MenuItems = [
  {
    to: ROUTES.HOME,
    tabName: 'Home',
    icon: <UserOutlined />,
    key: '1',
  },
  {
    to: ROUTES.FEATURES,
    tabName: 'Features',
    icon: <CheckCircleOutlined />,
    key: '2',
  },
  {
    to: ROUTES.FONT_AWESOME,
    tabName: 'Font Awesome Demo',
    icon: <SmileOutlined />,
    key: '3',
  },
  {
    to: ROUTES.LOADER,
    tabName: 'Loader Demo',
    icon: <LoadingOutlined />,
    key: '4',
  },
  {
    to: ROUTES.EXPORT_DATA,
    tabName: 'Export Data To CSV',
    icon: <ExportOutlined />,
    key: '5',
  },
  {
    to: ROUTES.NUMERAL_CONVERTER,
    tabName: 'Number Conversion Demo',
    icon: <NumberOutlined />,
    key: '6',
  },
  {
    to: ROUTES.SAMPLE_FORM,
    tabName: 'Redux-Saga Form',
    icon: <FormOutlined />,
    key: '7',
  },
  {
    to: ROUTES.TEST_ADMIN_PAGE,
    tabName: 'Admin Page',
    icon: <LockOutlined />,
    key: '8',
  },
];

/**
 * Filters Sidebar menu based on role
 * @param {string} role
 */
export const GET_FILTERED_MENU_ITEM = role =>
  MenuItems.filter(item =>
    // Check if route is private then role has access to it
    RESTRICTED_ROUTES.includes(item.to)
      ? ROLE_BASED_SIDEBAR_MENU[role || ROLES.USER].includes(item.to)
      : true,
  );
