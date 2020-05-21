import React, { Component }  from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
