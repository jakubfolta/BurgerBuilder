import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    purchasable: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(el => ingredients[el])
      .reduce((acc, el) => {
        return acc + el;
      }, 0)

    console.log(ingredients);
    console.log(sum);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = type => {
    // Update ingredient count
    const newCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;
    // Update price
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice, });

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

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          state={this.state}
          purchasable={this.state.purchasable} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;