/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component File.
 */
import React from 'react';
import Notification from 'components/Notification';
import { MenuItems } from './Constants';
import { StyledAppHeader, AvatarWrapper } from './StyledAppHeader';
import Avatar from '../Avatar';

const Header = () => (
  <StyledAppHeader>
    <AvatarWrapper>
      <Notification />
      <Avatar menu={MenuItems} />
    </AvatarWrapper>
  </StyledAppHeader>
);

export default Header;
