import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const PURCHASE_BURGER_SUCCESS = (id, orderData) => {
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
  return {
    type: actionTypes.SEND_ORDER
  }
}


axios.post('/orders.json', order)
  .then(response => {
    this.setState({loading: false})
    this.props.history.push('/');
  })
  .catch(error => {
    this.setState({loading: false})
  });