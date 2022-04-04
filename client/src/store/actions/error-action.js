import { errorActions } from '../slices/error-slice';

export const setError = (message) => {
  return async (dispatch) => {
    dispatch(
      errorActions.setError({
        message,
      })
    );
  };
};
