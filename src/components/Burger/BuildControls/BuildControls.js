import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

const BuildControls = props => (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => props.ingredientAdded(ctrl.type)}
          remove={() => props.ingredientRemoved(ctrl.type)}
          disabled={!props.ingredientsStatus[ctrl.type]} />
      ))}
    </div>
)

export default BuildControls;