import axios from 'axios';

export const getAllTeachers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/teachers');

      dispatch({
        type: 'GET_ALL_TEACHERS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'TEACHERS_ERROR',
      });
    }
  };
};

export const getTeacherById = (teacherId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/teachers/${teacherId}`);

      dispatch({
        type: 'GET_TEACHER_BY_ID',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'TEACHERS_ERROR',
      });
    }
  };
};
