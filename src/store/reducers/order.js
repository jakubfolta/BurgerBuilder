import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  // newOrder['id'] = action.orderId; // possible option
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
};

const purchaseFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false});
};

const fetchStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ORDERS
    case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state, action);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

    // FETCHED ORDERS
    case actionTypes.FETCH_ORDERS_START: return fetchStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchFail(state, action);
    default: return state;
  };
};

export default reducer;