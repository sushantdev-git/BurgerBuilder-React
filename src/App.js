import React, { Component } from 'react';
import  Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';

import { Route, Switch,withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSingUp();
  }
  render() {

    let routes ;
    //if user is not authenticate the we have this routes.
    routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated){
      //and if user is authenticated then we have this routes.
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/checkout"  component={Checkout} />
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
    isAuthenticated: state.auth.token != null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingUp :  () => dispatch(actions.authCheckState()),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
