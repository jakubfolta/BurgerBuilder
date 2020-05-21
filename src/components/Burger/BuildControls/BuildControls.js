import React, { Component } from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]

class BuildControls extends Component {
  render() {
    return (
      <div className={classes.BuildControls}>
      <h3>Current price: <strong>{this.props.price.toFixed(2)}</strong></h3>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => this.props.ingredientAdded(ctrl.type)}
          remove={() => this.props.ingredientRemoved(ctrl.type)}
          disabled={!this.props.ingredients[ctrl.type]} />
        ))}
        <button
          className={classes.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.order} >{this.props.isAuthenticated ? 'ORDER NOW' : 'Sign up to order'}</button>
      </div>
    )
  }
}

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  purchasable: PropTypes.bool.isRequired,
  order: PropTypes.func.isRequired
}

export default BuildControls;