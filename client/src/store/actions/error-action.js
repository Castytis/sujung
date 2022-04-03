import { v4 as uuidv4 } from 'uuid';
import { errorActions } from '../slices/error-slice';

export const setError = (message) => {
  return async (dispatch) => {
    const id = uuidv4();
    dispatch(
      errorActions.setError({
        payload: { message, id },
      })
    );
  };
};
