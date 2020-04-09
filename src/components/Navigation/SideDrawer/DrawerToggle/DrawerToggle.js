import React from 'react';

import classes from './DrawerToggle.module.css';

const DrawerToggle = props => (
  <div
    className={classes.DrawerToggle}
    onClick={props.show} />
)

export default DrawerToggle;