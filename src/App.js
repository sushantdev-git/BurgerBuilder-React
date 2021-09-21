import React, { Component } from 'react';
import  Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/orders" exact component={Orders} />
      </Layout>
    );
  }
}

export default App;
