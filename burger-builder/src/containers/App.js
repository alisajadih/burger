import React, { Component, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./Burgerbuilder/BurgerBuilder";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Spinner from '../components/UI/Spinner/Spinner';
import styles from './App.module.css';

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
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<div className={styles.SpinnerBox}><Spinner /></div>}>
              {routes}
            </Suspense>
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
