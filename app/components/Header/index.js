/* eslint-disable react/no-array-index-key */
/**
 * Avatar/index.js
 *
 * This is the Avatar Component File.
 */
import React from 'react';
import Notification from 'components/Notification';
import PropTypes from 'prop-types';
import { MenuItems } from './Constants';
import {
  StyledAppHeader,
  AvatarWrapper,
  StyledAppHeaderColored,
} from './StyledAppHeader';
import Avatar from '../Avatar';

const Header = props =>
  props.menuBackground ? (
    <StyledAppHeaderColored {...props}>
      <AvatarWrapper>
        <Notification />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeaderColored>
  ) : (
    <StyledAppHeader {...props}>
      <AvatarWrapper>
        <Notification />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeader>
  );

Header.propTypes = {
  menuBackground: PropTypes.bool,
};
export default Header;
