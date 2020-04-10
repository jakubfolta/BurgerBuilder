import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ing => {
      return [...Array(props.ingredients[ing])].map((_, i) => {
        return <BurgerIngredient key={ing + i} type={ing} />
      })
    })
    .reduce((acc, el) => {
      return acc.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
}

export default Burger;
