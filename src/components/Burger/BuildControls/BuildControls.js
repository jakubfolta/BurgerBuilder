import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = props => {
  const ingredients = Object.keys(props.ingredients)
  .map((el, i) => {
    return <BuildControl key={el + i} label={el} />;
  });

  return (
    <div className={classes.BuildControls}>
      {ingredients}
    </div>
  )
}

export default BuildControls;