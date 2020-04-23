import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      meat: 1,
    }
  }

  continueHandler = () => {
    this.props.history.push(this.props.match.url + '/form');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.continueHandler}
          checkoutCancelled={this.cancelHandler} />
      </div>
    )
  }
}

export default Checkout;