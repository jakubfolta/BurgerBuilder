import React, {Fragment, Component} from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log('[Modal] will update');
  }

  render() {
    return (
      <Fragment>
        <Backdrop
          show={this.props.show}
          hide={this.props.hide} />
        <div
          className={classes.Modal}
          style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? 1 : 0 }} >
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired
}

export default Modal;