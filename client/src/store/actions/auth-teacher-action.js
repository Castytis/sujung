import axios from 'axios';
import setAuthToken from '../../token/setAuthToken';
import { setNotification } from './notification-action';

export const registerTeacher = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/teachers', formData);

      dispatch({
        type: 'REGISTER_TEACHER_SUCCESS',
        payload: res.data,
      });

      dispatch(loadTeacher());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setNotification(error.msg, 'danger'));
        });
      }

      dispatch({
        type: 'REGISTER_TEACHER_FAIL',
      });
    }
  };
};

export const loginTeacher = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth-teacher', formData);

      dispatch({
        type: 'LOGIN_TEACHER_SUCCESS',
        payload: res.data,
      });

      dispatch(loadTeacher());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setNotification(error.msg, 'danger'));
        });
      }
      dispatch({
        type: 'LOGIN_TEACHER_FAIL',
      });
    }
  };
};

export const loadTeacher = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth-teacher');
      dispatch({
        type: 'TEACHER_LOADED',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_TEACHER_ERROR',
      });
    }
  };
};

export const logoutTeacher = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT_TEACHER',
    });
  };
};
