import React, { Fragment } from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  return (
    <Fragment>
      <BurgerIngredient type={'cheese'}/>
    </Fragment>
  );
}

export default Burger;
