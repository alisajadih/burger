import React,{Suspense} from "react";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter ,Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";
const asyncCheckout = React.lazy(() => import("./containers/Checkout/Checkout"));
const asyncOrders = React.lazy(() => import("./containers/Orders/Orders"));
const asyncAuth = React.lazy(() => import("./containers/Auth/Auth"));
// const asyncCheckout=asyncComponent(()=>{
//   return import ("./containers/Checkout/Checkout")
// })
// const asyncOrders=asyncComponent(()=>{
//   return import ("./containers/Orders/Orders")
// })
// const asyncAuth=asyncComponent(()=>{
//   return import ("./containers/Auth/Auth")
// })
class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Suspense fallback={<h2>Loading..</h2>}>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
        </Suspense>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Suspense fallback={<h2>Loading..</h2>}>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
          </Suspense>
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//----------------------------------------REMOVING INTERCEPTORS----------------------------------
// class App extends React.Component {
//   state = {
//     show: true,
//   };
//   componentDidMount(){
//     setTimeout(()=>{
//       this.setState({show:false})
//     },5000)
//   }
//   render() {
//     return (
//       <div className="App">
//         <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
//       </div>
//     );
//   }
// }
//--------------------------------------------------------------------------------------------------
// import React from "react";
// import { connect } from "react-redux";
// import Layout from "./components/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import { Route, Switch, withRouter ,Redirect } from "react-router-dom";
// import Logout from "./containers/Auth/Logout/Logout";
// import * as actions from "./store/actions/index";
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";
// const asyncCheckout=asyncComponent(()=>{
//   return import ("./containers/Checkout/Checkout")
// })
// const asyncOrders=asyncComponent(()=>{
//   return import ("./containers/Orders/Orders")
// })
// const asyncAuth=asyncComponent(()=>{
//   return import ("./containers/Auth/Auth")
// })
// class App extends React.Component {
//   componentDidMount() {
//     this.props.onTryAutoSignup();
//   }
//   render() {
//     let routes = (
//       <Switch>
//         <Route path="/auth" component={asyncAuth} />
//         <Route path="/" exact component={BurgerBuilder} />
//         <Redirect to="/"/>
//       </Switch>
//     );
//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route path="/checkout" component={asyncCheckout} />
//           <Route path="/orders" component={asyncOrders} />
//           <Route path="/logout" component={Logout} />
//           <Route path="/auth" component={asyncAuth} />
//           <Route path="/" exact component={BurgerBuilder} />
//           <Redirect to="/"/>
//         </Switch>
//       );
//     }
//     return (
//       <div className="App">
//         <Layout>{routes}</Layout>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTryAutoSignup: () => dispatch(actions.authCheckState()),
//   };
// };
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));