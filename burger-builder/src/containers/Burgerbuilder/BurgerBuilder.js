import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './BurgerBuiler.module.css';
import axios from 'axios';

class BurgerBuilder extends Component {
  state = {
    goingToOrder: false,
  };

  componentDidMount() {
    this.props.onFetchIngredients()
  }

  goingToOrderHandler = () => {
    this.props.isAuth ?
    this.setState({
      goingToOrder: true,
    }):
    this.props.history.push("/auth")
  };

  cancelPurchase = () => {
    this.setState({
      goingToOrder: false,
    });
  };

  continuePurchase = () => {
    this.props.onPurchaseInit()
    this.props.history.push('/checkout')
  };

  render() {
    const disableInfo = { ...this.props.ings };
    Object.keys(disableInfo).map(ing => disableInfo[ing] = disableInfo[ing] <= 0)

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p>
      : <div className={styles.SpinnerBox} ><Spinner /></div>;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            disableInfo={disableInfo}
            price={this.props.prc}
            purchaseable={this.props.prc > 4}
            goingToOrder={this.goingToOrderHandler}
            isAuth = {this.props.isAuth}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.prc}
          cancel={this.cancelPurchase}
          continue={this.continuePurchase}
        />
      );
    }



    return (
      <Aux>
        {burger}
        <Modal show={this.state.goingToOrder} cancel={this.cancelPurchase}>
          {orderSummary}
        </Modal>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.brg.ingredients,
    prc: state.brg.totalPrice,
    isAuth : state.auth.tokenId !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingType) => dispatch(actions.addIngredients(ingType)),
    onRemoveIngredient: (ingType) => dispatch(actions.removeIngredients(ingType)),
    onFetchIngredients: () => dispatch(actions.fetchIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))


