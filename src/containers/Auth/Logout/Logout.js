import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as authActions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogoutHandler();
  }

  render() {
    const logout = this.props.isAuthenticated ? <Spinner/> : <Redirect to="/" />
    return (
      <div>
        {logout}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogoutHandler: () => dispatch(authActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);