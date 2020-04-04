import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients)
    .map(
      })
    });

  return (
    <div className={classes.Burger}>
      {transformedIngredients}
    </div>
  );
}

export default Burger;
