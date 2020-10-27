import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return { type: actionTypes.AUTH_START }
}

const authSuccess = (tokenId, userId) => {
  return { type: actionTypes.AUTH_SUCCESS, tokenId: tokenId, userId: userId }
}

export const logout = () => {
  localStorage.removeItem("tokenId")
  localStorage.removeItem("userId")
  localStorage.removeItem("expirationDate")
  return { type: actionTypes.LOGOUT }
}

const authTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error }
}

export const resetError = () => {
  return { type: actionTypes.RESET_ERROR }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const address = isSignup ? "http://localhost:8000/register" : "http://localhost:8000/login"
    const authData = {
      email: email,
      password: password
    }
    let userId = null;
    let tokenId = null;
    setTimeout(() => {
      axios.post(address, authData)
        .then(response => {
          tokenId = response.data.accessToken;
          axios.get("http://localhost:8000/users")
            .then(res => {
              res.data.forEach(user => user.email === email ? userId = user.id : null)
              localStorage.setItem("tokenId", tokenId)
              localStorage.setItem("userId", userId)
              localStorage.setItem("expirationDate", new Date(new Date().getTime() + 3600 * 1000))
              dispatch(authSuccess(tokenId, userId))
              dispatch(authTimeout(3600))
              dispatch(resetError())
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
          console.log(err.message)
          dispatch(authFail(err.message))
        })
    }, 1000)

  }
}

export const checkAuthStatus = () => {
  return dispatch => {
    const tokenId = localStorage.getItem("tokenId")
    // if (tokenId) {
      const userId = localStorage.getItem("userId")
      const expiratin = localStorage.getItem("expirationDate")
      if (new Date() < new Date(expiratin)) {
        const remain = Math.round((new Date(expiratin).getTime() - new Date().getTime()) / 1000)
        dispatch(authSuccess(tokenId, userId))
        dispatch(authTimeout(remain))
      }
    // }
  }
}