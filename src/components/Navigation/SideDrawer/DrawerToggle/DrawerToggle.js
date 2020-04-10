import React from 'react';

import classes from './DrawerToggle.module.css';
import PropTypes from 'prop-types';

const DrawerToggle = props => (
  <div
    className={[classes.Toggle, classes.DesktopOnly].join(' ')}
    onClick={props.clicked} >
    <span className={classes.Toggle__button} />
  </div>
)

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
}

export default DrawerToggle;