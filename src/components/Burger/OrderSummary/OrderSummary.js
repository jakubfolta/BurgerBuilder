import React, { Fragment } from 'react';

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
      <p>Price: {(props.state.totalPrice).toFixed(2)}</p>
      <p>Continue to checkout?</p>
    </Fragment>
  )
}

export default OrderSummary;