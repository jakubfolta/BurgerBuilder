import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(el => {
      return (
        <li key={el}>
          <span style={{textTransform: 'capitalize'}}>{el}</span>: {this.props.ingredients[el]}
        </li>
      )
    })

    return (
      <Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Price: {(this.props.price).toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button
          btnType="Danger"
          clicked={this.props.purchaseCancelled} >Cancel</Button>
        <Button
          btnType="Success"
          clicked={this.props.purchaseContinued} >Continue</Button>
      </Fragment>
    );
  }
}

OrderSummary.propTypes = {
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired
};

export default OrderSummary;