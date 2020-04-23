import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {}
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
    console.log(this.state);
  }

  continueHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    console.log(this.state);
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