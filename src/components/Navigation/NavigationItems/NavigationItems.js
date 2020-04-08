import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.List}>
    <NavigationItem>Link</NavigationItem>
    <NavigationItem>Link2</NavigationItem>
    <NavigationItem>Link3</NavigationItem>
  </ul>
);

export default NavigationItems;