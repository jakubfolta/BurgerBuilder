import React from 'react';

import classes from './Modal.module.css';

const Modal = props => (
  <div
    className={classes.Modal}
    style={{visibility: props.show ? 'visible' : 'hidden', opacity: props.show ? 1 : 0}} >
    {props.children}
  </div>
)

export default Modal;