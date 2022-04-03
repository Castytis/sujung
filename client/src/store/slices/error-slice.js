import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = {};

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
