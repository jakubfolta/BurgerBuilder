import React from 'react';

import classes from './DrawerToggle.module.css';

const DrawerToggle = props => (
  <div
    className={[classes.Toggle, classes.DesktopOnly].join(' ')}
    onClick={props.clicked} >
    <span className={classes.Toggle__button} />
  </div>
)

export default DrawerToggle;