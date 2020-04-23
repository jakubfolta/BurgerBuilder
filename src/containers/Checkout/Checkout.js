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

  componentDidMount() {
    this.parseQuery();
  }

  parseQuery = () => {
    const query = new URLSearchParams(this.props.location.search);

    for (let param of query.entries()) {
      console.log(param[0]);
    }
  }

  continueHandler = () => {
    this.props.history.replace('checkout/contact-data');
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