import axios from 'axios';

export const getAllMeetings = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/meetings');

      dispatch({
        type: 'GET_ALL_MEETINGS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};
