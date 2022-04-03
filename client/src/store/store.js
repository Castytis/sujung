import { configureStore } from '@reduxjs/toolkit';

import errorReducer from './slices/error-slice';

const store = configureStore({
  reducer: { errorReducer },
});

export default store;
