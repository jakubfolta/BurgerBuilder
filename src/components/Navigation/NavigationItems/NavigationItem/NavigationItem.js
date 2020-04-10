import React from 'react';

import classes from './NavigationItem.module.css';
import PropTypes from 'prop-types';

const NavigationItem = props => (
  <li className={classes.Item} >
    <a
      href={props.link}
      className={props.active ? classes.active : null} >{props.children}</a>
  </li>
);

NavigationItem.propTypes = {
  link: PropTypes.string.isRequired
}

export default NavigationItem;