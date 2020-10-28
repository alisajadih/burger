import * as actionTypes from './actionTypes';
import axios from 'axios';

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT }
}

const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START }
}

const purchaseBurgerSuccess = (data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    data: data,
  }
}

const purchaseBurgerFails = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error }
}

export const purchaseBurger = (order) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post("http://localhost:8000/orders", order)
      .then((res) => {
        setTimeout(() => {
          dispatch(purchaseBurgerSuccess(res.data))
        }, 1000)
      })
      .catch((err) => {
        dispatch(purchaseBurgerFails(err))
      });
  }
}




const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START }
}

const fetchOrdersSuccess = (orders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders }
}

const fetchOrdersFail = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: error }
}

export const fetchOrders = (userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get("http://localhost:8000/orders")
      .then(res => {
        let orders = res.data.map(order => { return { ...order } });
        orders = orders.filter(order => order.userId === Number(userId))
        setTimeout(() => {
          dispatch(fetchOrdersSuccess(orders))
        }, 1000)
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}
