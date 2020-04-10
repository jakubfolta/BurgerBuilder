import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/original.png';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="logo"/>
  </div>
)

export default Logo;