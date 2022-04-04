import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = { message: null };

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: {
    setError(state, action) {
      state.message = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
