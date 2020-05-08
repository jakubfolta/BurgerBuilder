import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    order: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients: res.data});
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
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
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('totalPrice=' + encodeURIComponent(this.state.totalPrice));

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    })
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredientHandler}
            ingredientRemoved={this.props.onRemoveIngredientHandler}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchasable={this.state.purchasable}
            order={this.orderHandler}/>
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
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredientHandler: (ingType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingType}),
    onRemoveIngredientHandler: (ingType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingType})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

