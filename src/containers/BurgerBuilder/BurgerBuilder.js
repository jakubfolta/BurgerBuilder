import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';
import * as orderActions from '../../store/actions/index';
import * as authActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    order: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  orderHandler = () => {
    if (this.props.isAuth) {
      this.setState({order: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(el => ingredients[el])
      .reduce((acc, el) => {
        return acc + el;
      }, 0);
    return sum > 0;
  };

  purchaseCancelHandler = () => {
    this.setState({order: false});
  };

// REDUX IMPLEMENTED - NO NEED TO PASS QUERY PARAMS

  purchaseContinueHandler = () => {
    // const queryParams = [];
    //
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('totalPrice=' + encodeURIComponent(this.state.totalPrice));
    this.props.onPurchaseInit();
    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryParams.join('&')
    })
  };

  render() {
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredientHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            order={this.orderHandler}
            isAuthenticated={this.props.isAuth} />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />
      )
    }
    return (
      <Fragment>
        <Modal
          show={this.state.order}
          hide={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.bur.ingredients,
    totalPrice: state.bur.totalPrice,
    error: state.bur.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: (ingType) => dispatch(burgerBuilderActions.addIngredient(ingType)),
    onRemoveIngredientHandler: (ingType) => dispatch(burgerBuilderActions.removeIngredient(ingType)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onPurchaseInit: () => dispatch(orderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

