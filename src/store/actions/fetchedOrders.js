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

export const fetchOrdersSuccess = () => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS
  }
}

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  }
}