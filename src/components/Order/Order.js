import React from 'react';

import classes from './Order.module.css';

const Order = props => {
  // const ingredients = Object.keys(props.ingredients)
  //   .map(i => {
  //     return i + ` (${props.ingredients[i]})`;
  //   })
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(i => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc'
      }}
      key={i.name}>{i.name} ({i.amount})</span>;
  })

  return (
    <div className={classes.Order}>
      {/* <p>Ingredients: {ingredients.join(' ')}</p> */}
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {(+props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default Order;