import axios from 'axios';

export const getCurrentParent = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/parents/me');

      dispatch({
        type: 'GET_CURRENT_PARENT',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'PARENT_ERROR',
      });
    }
  };
};
