import React, { Fragment } from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

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
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  )
};

export default SideDrawer;