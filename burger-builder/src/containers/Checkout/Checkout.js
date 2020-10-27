import React, { Component } from "react";
import ContactData from "../ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import styles from './Checkout.module.css'

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkoutSummary = <Redirect to="/" />
    const purachsedRedirect = this.props.purchased ? <Redirect to="/" /> : null

    if (this.props.ings) {
      checkoutSummary = (
        <div>
          {purachsedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            // path={"/checkout/contact-data"}
            render={() => <ContactData ingredients={this.props.ings} price={this.props.prc} />}
          />
        </div>
      )
    }
    if (!this.props.isAuth) {
      checkoutSummary =<p className ={styles.Error}>Your Not Logged In, Please Log In First.</p>
    }

    return checkoutSummary;
  }
}


const mapStateToProps = (state) => {
  return {
    ings: state.brg.ingredients,
    prc: state.brg.totalPrice,
    purchased: state.ord.purchased,
    isAuth: state.auth.tokenId !== null
  }
}


export default connect(mapStateToProps)(withRouter( Checkout));
