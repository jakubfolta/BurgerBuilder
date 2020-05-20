import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// ORDERS
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

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
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', order)
    .then(response => {
      return dispatch(purchaseBurgerSuccess(response.data.name, order))
    })
    .catch(error => {
      return dispatch(purchaseBurgerFail(error))
    })
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

// FETCHED ORDERS
export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    axios.get('orders.json?auth=' + token)
    .then(res => {
      const fetchedOrders = [];
      for (let order in res.data) {
        fetchedOrders.push({
          ...res.data[order],
          id: order
        })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error));
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
