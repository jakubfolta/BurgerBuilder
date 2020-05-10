import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

// REDUX IMPLEMENTED - NO NEED FOR LIFECYCLE HOOKS

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const queryIngredients = {};
  //   let price = 0;
  //
  //   for (let param of query.entries()) {
  //     if (param[0] === 'totalPrice') {
  //       price = param[1];
  //     } else {
  //       queryIngredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ingredients: queryIngredients, price: price});
  // }

  continueHandler = () => {
    this.props.history.replace('checkout/contact');
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  render() {
    console.log(this.props);
    let checkoutSummary = <Spinner />;
    if (this.props.ingredients) {
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.props.ingredients}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
