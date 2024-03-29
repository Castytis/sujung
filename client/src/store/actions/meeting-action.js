import axios from 'axios';
import { saveAs } from 'file-saver';
import { setNotification } from './notification-action';

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

      dispatch(setNotification('Susitikime dalyvaujate', 'success'));
      dispatch(getMeetingById(meetingId));
    } catch (error) {
      dispatch(setNotification('Susitikime jau dalyvaujate', 'danger'));

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

      dispatch(setNotification('Palikote susitikimą', 'success'));
      dispatch(getMeetingById(meetingId));
      dispatch(getCurrentParticipantsMeetings());
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const createMeeting = (formData, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/meetings', formData);

      dispatch({
        type: 'CREATE_MEETING',
        payload: res.data,
      });

      dispatch(setNotification('Susitikimas sukurtas', 'success'));

      navigate('/meetings');
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setNotification(error.msg, 'danger'));
        });
      }
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const deleteMeeting = (meetingId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/meetings/${meetingId}`);

      dispatch({
        type: 'DELETE_MEETING',
      });

      dispatch(setNotification('Susitikimas ištrintas', 'success'));
      dispatch(getCurrentUsersOrganisedMeetings());
    } catch (error) {
      dispatch({
        type: 'MEETINGS_ERROR',
      });
    }
  };
};

export const downloadReport = (reportData) => {
  return async () => {
    await axios.post('/api/meetings/create-pdf', reportData);

    const response = await axios.get('/api/meetings/fetch-pdf', {
      responseType: 'blob',
    });

    const pdfBlob = await new Blob([response.data], {
      type: 'application/pdf',
    });

    await saveAs(pdfBlob, 'ataskaita.pdf');
  };
};
