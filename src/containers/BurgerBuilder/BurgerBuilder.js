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
    totalPrice: 4
  }

  addIngredientHandler = type => {
    // Update ingredient
    const newCount = this.state.ingredients[type] + 1;
    const updatedCount = {...this.state.ingredients};
    updatedCount[type] = newCount;

    // Update price
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ingredients: updatedCount, totalPrice: newPrice});
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredients={this.state.ingredients} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;