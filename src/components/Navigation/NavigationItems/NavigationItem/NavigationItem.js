import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';
import PropTypes from 'prop-types';

const NavigationItem = props => (
  <li className={classes.NavigationItem} >
    <NavLink
      to={props.link}
      activeClassName={classes.active} exact>{props.children}</NavLink>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired
}

export default NavigationItem;