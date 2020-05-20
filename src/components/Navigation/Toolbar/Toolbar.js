import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import PropTypes from 'prop-types';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.open} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems auth={props.isAuth} />
    </nav>
  </header>
);

Toolbar.propTypes = {
  open: PropTypes.func.isRequired
}

export default Toolbar;