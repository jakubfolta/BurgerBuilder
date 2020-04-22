import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';

const CheckoutSummary = props => {
  return (
    <div className={classes.Checkout}>
      <h1>We hope it tastes well!!!</h1>
      <div>
        <Burger />
      </div>
    </div>
  )
}

export default CheckoutSummary;