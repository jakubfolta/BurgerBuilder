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

const ingredients = (ing) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    initIngredients: ing
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        return dispatch(ingredients(res.data));
      })
      // .catch(error => {
      //   this.setState({error: true})
      // })
  }
}