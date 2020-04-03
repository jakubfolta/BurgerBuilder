import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(ing => {
      return [...Array(props.ingredients[ing])].map(_, i => {
        return <BurgerIngredient type={ing} /> 
      })
    });

  return (
    <div className={classes.Burger}>
      {transformedIngredients}
    </div>
  );
}

export default Burger;
