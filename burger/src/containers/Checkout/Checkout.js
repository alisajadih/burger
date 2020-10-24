import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContatData from './ContactData/ContatData'

class Checkout extends Component {
   state = {
      ingredient: {
         salad: 1,
         bacon: 1,
         cheese: 2,
         meat: 1
      },
      total_price: 0
   }

   componentDidMount() {
      const query = new URLSearchParams(this.props.location.search)
      let ingredient = {}
      let price =0; 
      for (let param of query.entries()) {
         if (param[0] === 'price') price=param[1]
         else
            ingredient[param[0]] = +param[1]
      }
      // const parametr = Object.entries(query); //['meat', '2']
      // console.log(parametr);
      // parametr.forEach(param => {
      //    console.log(param);
      //    ingredient[param[0]] = +param[1]
      // })
      this.setState({ ingredient: ingredient, total_price: price })
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
               render={() => <ContatData ingredient={this.state.ingredient} total_price={this.state.total_price} />} />
         </div>)
   }
}
export default Checkout; 