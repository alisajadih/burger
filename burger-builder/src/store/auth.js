import * as actionTypes from './actions/actionTypes';

const initialState = {
  tokenId: null,
  userId: null,
  error: null,
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.AUTH_START):
      return { ...state, loading: true }
    case (actionTypes.AUTH_SUCCESS):
      return { ...state, loading: false, tokenId: action.tokenId, userId: action.userId }
    case (actionTypes.AUTH_FAIL):
      return { ...state, loading: false, error: action.error }
    case (actionTypes.RESET_ERROR):
      return { ...state, error: false }
    case (actionTypes.LOGOUT):
      return {...state, tokenId:null, userId: null}
    default:
      return state;
  }
}

export default reducer;