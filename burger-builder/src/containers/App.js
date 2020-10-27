import React, { Component, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./Burgerbuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
// import Checkout from "./Checkout/Checkout";
// import Orders from './Orders/Orders';
// import Auth from '../containers/Auth/Auth';
// import Logout from './Auth/Loogout/Logout';

const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Orders = React.lazy(() => import("./Orders/Orders"));
const Auth = React.lazy(() => import("../containers/Auth/Auth"));
const Logout = React.lazy(() => import("./Auth/Loogout/Logout"))



class App extends Component {

  componentDidMount = () => {
    this.props.onCheckAuthStatus()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Suspense fallback={<div>Loading ...</div>}><Auth /></Suspense>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" render={() => <Suspense fallback={<div>Loading ...</div>}><Checkout /></Suspense>} />
          <Route path="/orders" render={() => <Suspense fallback={<div>Loading ...</div>}><Orders /></Suspense>} />
          <Route path="/auth" render={() => <Suspense fallback={<div>Loading ...</div>}><Auth /></Suspense>} />
          <Route path="/logout" render={() => <Suspense fallback={<div>Loading ...</div>}><Logout /></Suspense>} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.tokenId !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthStatus: () => dispatch(actions.checkAuthStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
