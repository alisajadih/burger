import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContatData'

class Checkout extends Component {
   state = {
      ingredient: {
         salad: 1,
         bacon: 1,
         cheese: 2,
         meat: 1
      }
   }

   componentDidMount() {
      const query = new URLSearchParams(this.props.location.search)
      let ingredient = {}
      for (let param of query.entries()) {
         ingredient[param[0]] = +param[1]

      }
      // const parametr = Object.entries(); //['meat', '2']
      // parametr.forEach(param => {
      // })
      this.setState({ ingredient: ingredient })
   }

   checkoutCancelHandler = () => {
      this.props.history.goBack();
   };

   checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data')
   };

   render() {

      return (
         <div>
            <CheckoutSummary
               ingredient={this.state.ingredient}
               checkoutCancelled={this.checkoutCancelHandler}
               checkoutContinued={this.checkoutContinueHandler}
            />
            <Route
               path={this.props.match.path + '/contact-data'}
               render={()=> <ContactData ingredient={this.props.ingredient}/>}/>
         </div>)
   }
}
export default Checkout; 