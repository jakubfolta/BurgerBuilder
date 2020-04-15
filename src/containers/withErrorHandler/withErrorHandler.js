import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = WrappedComponent => {
  return props => {
    return (
      <Fragment>
        <Modal>
          Something didn't work!
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    )
  }
}

export default withErrorHandler;