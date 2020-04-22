import React, { Component }  from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <BurgerBuilder />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
