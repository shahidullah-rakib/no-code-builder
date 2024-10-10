import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    // Add other reducers as necessary
  },
});

export const { addElement } = elementsSlice.actions;

export default elementsSlice.reducer;
