import React from 'react';

import classes from './NavigationItem.module.css';

const NavigationItem = props => (
  <li className={classes.Item} ><a href="/">{props.children}</a></li>
);

export default NavigationItem;