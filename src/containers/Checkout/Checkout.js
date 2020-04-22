import React, { Component } from 'react';

import classes from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  render() {
    return (
      <CheckoutSummary />
    )
  }
}

export default Checkout;