import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: id
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('id');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = method ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' :
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

    axios.post(url + 'AIzaSyBt1hNeexfyrar-eMbWrvvayE_MZy8Yask', authData)
      .then(response => {
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('id', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      })
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const userId = localStorage.getItem('id');
      if (expirationDate > new Date()) {
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout())
      } else {
        dispatch(logout());
      }
    }
  }
}