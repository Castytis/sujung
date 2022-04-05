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
