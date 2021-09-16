import React, { Component } from 'react';
import  Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
        <p>Hello how are you</p>
      </Layout>
    );
  }
}

export default App;
