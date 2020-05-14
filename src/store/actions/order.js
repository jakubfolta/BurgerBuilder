import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const sendOrder = (order) => {
  return dispatch => {
    axios.post('/orders.json', order)
    .then(response => {
      return dispatch(purchaseBurgerSuccess(response.data, order))
    })
    .catch(error => {
      return dispatch(purchaseBurgerFail(error))
    })
  };
};