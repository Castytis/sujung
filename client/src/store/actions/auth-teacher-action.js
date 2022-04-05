import axios from 'axios';
import setAuthToken from '../../token/setAuthToken';

export const registerTeacher = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/teachers', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });

      dispatch(loadTeacher());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch({
        type: 'REGISTER_FAIL',
      });
    }
  };
};

export const loginTeacher = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth-teacher', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });

      dispatch(loadTeacher());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch({
        type: 'LOGIN_FAIL',
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
