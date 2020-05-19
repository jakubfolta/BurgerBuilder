import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

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
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err.response);
        dispatch(authFail(err.response));
      })
  };
};