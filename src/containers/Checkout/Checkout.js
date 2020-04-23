import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  componentDidMount() {
    this.parseQuery();
  }

  parseQuery = () => {
    const query = new URLSearchParams(this.props.location.search);
    let queryIngredients = {}

    for (let param of query.entries()) {
      queryIngredients[param[0]] = +param[1];
    }
    this.setState({ingredients: queryIngredients})
  }

  continueHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let checkoutSummary = <Spinner />;
    if (this.state.ingredients) {
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.continueHandler}
          checkoutCancelled={this.cancelHandler} />
      )
    }
    return (
      <div>
        {checkoutSummary}
      </div>
    )
  }
}

export default Checkout;