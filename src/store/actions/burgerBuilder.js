import * as actionTypes from './actionTypes';

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