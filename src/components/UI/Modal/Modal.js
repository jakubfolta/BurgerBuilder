import React, {Fragment} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const Modal = props => (
  <Fragment>
    <Backdrop
      show={props.show}
      hide={props.hide} />
    <div
      className={classes.Modal}
      style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? 1 : 0 }} >
      {props.children}
    </div>
  </Fragment>
)

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
}

export default Modal;