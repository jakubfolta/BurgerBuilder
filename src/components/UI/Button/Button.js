import React from 'react';

import classes from './Button.module.css';
import PropTypes from 'prop-types';

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked} >{props.children}</button>
);

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default Button;