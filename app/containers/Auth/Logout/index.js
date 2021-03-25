import React from 'react';
import PropTypes from 'prop-types';
import StorageService from 'utils/StorageService';
import { ROUTES } from '../constants';

const Logout = props => {
  StorageService.clear();
  props.history.push(ROUTES.LOGIN);

  return <React.Fragment />;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
