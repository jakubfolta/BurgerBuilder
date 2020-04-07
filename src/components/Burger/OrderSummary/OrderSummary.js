import React, { Fragment } from 'react';

import classes from './OrderSummary.module.css';

const OrderSummary = props => {
  const ingredientSummary = props.ingredients

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Price: {props.state.totalPrice}</p>
    </Fragment>
  )
}

export default OrderSummary;