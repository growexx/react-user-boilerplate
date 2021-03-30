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
  {
    to: ROUTES.LOADER,
    tabName: 'Loader Demo',
    icon: <LoadingOutlined />,
  },
  {
    to: ROUTES.EXPORTDATA,
    tabName: 'Export Data To CSV',
    icon: <ExportOutlined />,
  },
  {
    to: ROUTES.NUMERALCONVERTER,
    tabName: 'Number Conversion Demo',
    icon: <NumberOutlined />,
  },
];
