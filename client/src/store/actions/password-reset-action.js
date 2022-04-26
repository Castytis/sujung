import axios from 'axios';
import { setNotification } from './notification-action';

export const sendPasswordRecoveryLink = (email) => {
  return async (dispatch) => {
    try {
      await axios.put('/api/password/forgotpassword', email);
      dispatch(
        setNotification('Slaptažodžio atkūrimo nuoroda išsiųsta', 'success')
      );
    } catch (error) {
      dispatch(
        setNotification('Naudotojas su tokiu el. paštu neegzistuoja', 'danger')
      );
    }
  };
};

export const resetPassword = (newPassword, link, navigate) => {
  return async (dispatch) => {
    try {
      const resetLink = link.resetLink;
      await axios.put('/api/password/resetpassword', {
        newPassword,
        resetLink,
      });
      navigate('../../login');
      dispatch(setNotification('Slaptažodis atnaujinas sėkmingai', 'success'));
    } catch (error) {
      dispatch(setNotification('Nepavyko atnaujinti slaptažodžio', 'danger'));
    }
  };
};
