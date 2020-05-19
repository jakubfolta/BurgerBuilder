import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {

}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:

      return updateObject(state, {loading: true});


    default: return state;
  }
}

export default reducer;