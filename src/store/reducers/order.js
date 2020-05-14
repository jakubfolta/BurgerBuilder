import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true})

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {...action.orderData};
      newOrder['id'] = action.orderId;

      return updateObject(state, {
        error: false,
        loading: false,
        orders: state.orders.concat({
          id: action.orderId,
          order: action.orderData
        })
      })

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {error: true})

    default:
      return state;
  };
};

export default reducer;