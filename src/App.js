import React, { Component, lazy, Suspense }  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as authActions from './store/actions/index';

const Orders = lazy(() => import('./containers/Orders/Orders'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    const ordersSuspense = <Suspense fallback=<div>Loading...</div>><Orders /></Suspense>;
    const checkoutSuspense = <Suspense fallback=<div>Loading...</div>><Checkout /></Suspense>;
    const authSuspense = <Suspense fallback=<div>Loading...</div>><Auth /></Suspense>;

    const routes = this.props.isAuth
      ? (
        <Switch>
          <Route path="/orders" render={() => ordersSuspense} />
          <Route path="/checkout" render={() => checkoutSuspense} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={() => authSuspense} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
      : (
        <Switch>
          <Route path="/auth" render={() => authSuspense} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )

    return (
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(authActions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
