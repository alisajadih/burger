import * as actionTypes from './actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.SET_INGREDIENTS):
      return {
        ...state, ingredients: action.ingredients, totalPrice: 4,
      }
    case (actionTypes.ADD_INGREDIENTS):
      return {
        ...state, totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingType], ingredients: {
          ...state.ingredients, [action.ingType]: state.ingredients[action.ingType] + 1
        }
      };
    case (actionTypes.REMOVE_INGREDIENTS):
      return {
        ...state, totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingType], ingredients: {
          ...state.ingredients, [action.ingType]: state.ingredients[action.ingType] - 1
        }
      }
    default:
      return state;
  }
}

export default reducer;


const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2,
};
