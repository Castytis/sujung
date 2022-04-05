import axios from 'axios';
import setAuthToken from '../../token/setAuthToken';

export const registerParent = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/parents', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });

      dispatch(loadParent());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch({
        type: 'REGISTER_FAIL',
      });
    }
  };
};

export const loginParent = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth-parent', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });

      dispatch(loadParent());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch({
        type: 'LOGIN_FAIL',
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
    dispatch({
      type: 'LOGOUT_PARENT',
    });
  };
};
