import { configureStore } from '@reduxjs/toolkit';
import elementsReducer from './elementsSlice';

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
  },
});
