import React, { Fragment } from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PropTypes from 'prop-types';

const SideDrawer = props => {
  const attachedClasses = props.open ? "Open" : "Close";

  return (
    <Fragment>
      <Backdrop
        show={props.open}
        hide={props.hide} />
      <div className={[classes.SideDrawer, classes[attachedClasses]].join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
          <NavigationItems auth={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  )
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
}

export default SideDrawer;