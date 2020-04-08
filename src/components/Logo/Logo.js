import React from 'react';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/original.png';

const Logo = props => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="logo"/>
  </div>
)

export default Logo;