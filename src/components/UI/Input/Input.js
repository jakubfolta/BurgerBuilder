import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (!props.validity && props.shouldValidate) {
    inputClasses.push(classes.NotValid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        onChange={props.change}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        onChange={props.change}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case ('select'):
      inputElement = (
        <select
          onChange={props.change}
          className={inputClasses.join(' ')}
          value={props.value}>
          {props.elementConfig.options.map(o => (
            <option
              key={o.value}
              value={o.value}>
              {o.displayValue}
            </option>
          ))}
        </select>);
      break;
    default:
      inputElement = <input
        onChange={props.change}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default Input;