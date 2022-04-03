import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = { message: [] };

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
