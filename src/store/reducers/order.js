import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true})

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      // newOrder['id'] = action.orderId; // possible option
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      })

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {loading: false})

    case actionTypes.PURCHASE_INIT:
      return updateObject(state, {purchased: false})

    default:
      return state;
  };
};

export default reducer;