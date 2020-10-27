import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Orders.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.userId)
  }

  render() {
    let orders = <div className={styles.SpinnerBox} >
      <Spinner />
    </div>
    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
        return <Order {...order} key={order.id} />
      })
    }
    if (!this.props.isAuth) {
      orders =<p className ={styles.Error}>Your Not Logged In, Please Log In First.</p>
    }
    return <div> {orders} </div>
  }
}

const mapStaetToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    isAuth: state.auth.tokenId !== null,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (userId) => dispatch(actions.fetchOrders(userId))
  }
}

export default connect(mapStaetToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));