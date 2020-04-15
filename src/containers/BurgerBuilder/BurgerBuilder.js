import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    order: false,
    loading: false
  }

  orderHandler = () => {
    this.setState({order: true})
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(el => ingredients[el])
      .reduce((acc, el) => {
        return acc + el;
      }, 0)
    this.setState({purchasable: sum > 0});
  };

  addIngredientHandler = type => {
    // Update ingredient count
    const newCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;
    // Update price
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // Update ingredient count
    if (this.state.ingredients[type] <= 0) {
      return
    }
    const newCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;
    // Update price
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseCancelHandler = () => {
    this.setState({order: false});
  };

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    })

    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Jake F',
        address: {
          street: 'Teststreet 1',
          zipCode: '43245',
          country: 'UK'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, order: false})
      })
      .catch(error => {
        this.setState({loading: false, order: false})
      })
  };

  render() {
    let orderSummary = (
      <OrderSummary
        state={this.state}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
    )
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Fragment>
        <Modal
          show={this.state.order}
          hide={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          state={this.state}
          purchasable={this.state.purchasable}
          order={this.orderHandler}/>
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);