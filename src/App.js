import React, { Component } from 'react';
import  Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/checkout"  component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder}/>
      </Layout>
    );
  }
}

export default App;
