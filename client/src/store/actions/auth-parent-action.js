import axios from 'axios';
import setAuthToken from '../../token/setAuthToken';
import { setNotification } from './notification-action';

export const registerParent = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/parents', formData);

      dispatch({
        type: 'REGISTER_PARENT_SUCCESS',
        payload: res.data,
      });

      dispatch(loadParent());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setNotification(error.msg, 'danger'));
        });
      }

      dispatch({
        type: 'REGISTER_PARENT_FAIL',
      });
    }
  };
};

export const loginParent = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth-parent', formData);

      dispatch({
        type: 'LOGIN_PARENT_SUCCESS',
        payload: res.data,
      });

      dispatch(loadParent());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setNotification(error.msg, 'danger'));
        });
      }
      dispatch({
        type: 'LOGIN_PARENT_FAIL',
      });
    }
  };
};

export const loadParent = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth-parent');
      dispatch({
        type: 'PARENT_LOADED',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_PARENT_ERROR',
      });
    }
  };
};

export const logoutParent = () => {
  return async (dispatch) => {
    dispatch(setNotification('Atsijungėtė nuo sistemos', 'success'));
    dispatch({
      type: 'LOGOUT_PARENT',
    });
  };
};
