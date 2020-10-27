import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredients = (ingType) => {
  return { type: actionTypes.ADD_INGREDIENTS, ingType: ingType }
}

export const removeIngredients = (ingType) => {
  return { type: actionTypes.REMOVE_INGREDIENTS, ingType: ingType }
}

const setIngredients = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients }
}

const fetchIngredientsFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
}

export const fetchIngredients = () => {
  return dispatch => {
    axios.get("http://localhost:8000/ingsInit")
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
  }
}