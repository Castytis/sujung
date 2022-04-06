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

export const getMeetingById = (meetingId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/meetings/${meetingId}`);

      dispatch({
        type: 'GET_MEETING_BY_ID',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const addParticipant = (meetingId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/meetings/${meetingId}`);

      dispatch({
        type: 'ADD_PARTICIPANT',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};
