import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return updateObject(state, {error: false})

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, {error: true})
  }
}

export default reducer;