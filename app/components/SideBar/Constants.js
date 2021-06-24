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
  PieChartOutlined,
  MessageOutlined,
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
  },
  {
    to: ROUTES.USERS,
    tabName: 'User Management',
    icon: <UserOutlined />,
  },
  {
    to: ROUTES.FEATURES,
    tabName: 'Features',
    icon: <CheckCircleOutlined />,
  },
  {
    to: ROUTES.FONT_AWESOME,
    tabName: 'Font Awesome Demo',
    icon: <SmileOutlined />,
  },
  {
    to: ROUTES.LOADER,
    tabName: 'Loader Demo',
    icon: <LoadingOutlined />,
  },
  {
    to: ROUTES.EXPORT_DATA,
    tabName: 'Export Data To CSV',
    icon: <ExportOutlined />,
  },
  {
    to: ROUTES.NUMERAL_CONVERTER,
    tabName: 'Number Conversion Demo',
    icon: <NumberOutlined />,
  },
  {
    to: ROUTES.SAMPLE_FORM,
    tabName: 'Redux-Saga Form',
    icon: <FormOutlined />,
  },
  {
    to: ROUTES.TEST_ADMIN_PAGE,
    tabName: 'Admin Page',
    icon: <LockOutlined />,
  },
  {
    to: ROUTES.CHARTS,
    tabName: 'Charts',
    icon: <PieChartOutlined />,
  },
  {
    to: ROUTES.MULTI_TAB_SUPPORT,
    tabName: 'Multi Tab Communication',
    icon: <MessageOutlined />,
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
