import React from 'react';

import classes from './Button.module.css';

const Button = props => (
  <button
    styleName={[classes.Button, [classes[props.btnType]].join(' ')]}
    clicked={props.cancel} >{props.children}</button>
);

export default Button;