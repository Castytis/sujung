import { v4 as uuidv4 } from 'uuid';

export const setNotification = (msg, msgType) => {
  return async (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { msg, msgType, id },
    });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, 3000);
  };
};
