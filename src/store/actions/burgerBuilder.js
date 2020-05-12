import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingType
  };
};

export const removeIngredient = (ingType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingType
  };
};

export const setIngredients = (ing) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    initIngredients: ing
  };
};

export const setError = () => {
  return {
    type: actionTypes.SET_ERROR
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        return dispatch(setIngredients(res.data));
      })
      .catch(error => {
        return dispatch(setError())
      })
  }
}