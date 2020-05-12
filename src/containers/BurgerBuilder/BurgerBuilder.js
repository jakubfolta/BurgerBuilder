import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {
  state = {
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

    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryParams.join('&')
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
            purchasable={this.updatePurchaseState(this.props.ingredients)}
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
    onAddIngredientHandler: (ingType) => dispatch(actionCreators.addIngredient(ingType)),
    onRemoveIngredientHandler: (ingType) => dispatch(actionCreators.removeIngredient(ingType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

