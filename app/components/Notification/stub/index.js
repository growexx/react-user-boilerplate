import React from 'react';
import {
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined,
  ExportOutlined,
  NumberOutlined,
} from '@ant-design/icons';
const NOTIFICATIONS = [
  {
    icon: <UserOutlined />,
    update: '70 new employees are shifted',
    timestamp: 1596119688264,
  },
  {
    icon: <CheckCircleOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
  },
  {
    icon: <SmileOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
  },
  {
    icon: <ExportOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
  },
  {
    icon: <NumberOutlined />,
    update: '70 new employees are shifted',
    timestamp: 1596119688264,
  },
];

export const TEST_IDS = {
  MARK_ALL_READ: 'MARK_ALL_READ',
  BELL_ICON: 'BELL_ICON',
  EMPTY_CONTAINER: 'EMPTY_CONTAINER',
  INFINITE_SCROLLING: 'INFINITE_SCROLLING',
};

export const getNotificationsSuccessMock = () =>
  Promise.resolve({
    data: NOTIFICATIONS,
    status: 1,
  });
export const getNotificationsMockWithNoData = () =>
  Promise.resolve({
    data: [],
    status: 0,
  });
export const getNotificationsMockWithLessData = () =>
  Promise.resolve({
    data: [NOTIFICATIONS[0]],
    status: 1,
  });
export const getNotificationsFailureData = () =>
  Promise.reject(
    new Error({
      message: 'something went wrong',
    }),
  );
