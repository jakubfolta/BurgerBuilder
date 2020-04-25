import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const queryIngredients = {}

    
  }

  continueHandler = () => {
    this.props.history.replace('checkout/contact');
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
        <Route path={this.props.match.path + '/contact'} component={ContactData} />
      </div>
    )
  }
}

export default Checkout;























//
// componentDidMount() {
//   this.parseQuery();
// }
//
// parseQuery = () => {
//   const query = new URLSearchParams(this.props.location.search);
//   let queryIngredients = {}
//
//   for (let param of query.entries()) {
//     queryIngredients[param[0]] = +param[1];
//   }
//   this.setState({ingredients: queryIngredients})
// }
