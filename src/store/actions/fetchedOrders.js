import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchOrders = () => {
  return dispatch => {
    axios.get('orders.json')
    .then(res => {
      dispatch(fetchOrdersSuccess())
    })
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}