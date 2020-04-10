import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.state.ingredients)
    .map(el => {
      return (
        <li key={el}>
          <span style={{textTransform: 'capitalize'}}>{el}</span>: {props.state.ingredients[el]}
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
      <p><strong>Price: {(props.state.totalPrice).toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.purchaseCancelled} >Cancel</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinued} >Continue</Button>
    </Fragment>
    );

}

OrderSummary.propTypes = {
  state: PropTypes.object.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired
};

export default OrderSummary;