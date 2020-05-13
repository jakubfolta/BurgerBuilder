import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';



export const sendOrder = (order) => {
  return {
    type: actionTypes.SEND_ORDER
  }
}