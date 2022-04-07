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

export const getCurrentUsersOrganisedMeetings = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/meetings/me');

      dispatch({
        type: 'ORGANISED_MEETINGS',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const getCurrentParticipantsMeetings = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/meetings/participating/me');

      dispatch({
        type: 'PARTICIPATION_MEETINGS',
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
      const res = await axios.put(`/api/meetings/participate/${meetingId}`);

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

export const removeParticipant = (meetingId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/meetings/leave/${meetingId}`);

      dispatch({
        type: 'DELETE_PARTICIPANT',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const createMeeting = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/meetings', formData);

      dispatch({
        type: 'CREATE_MEETING',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};
