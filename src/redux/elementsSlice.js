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
    updateElement: (state, action) => {
      const index = state.elements.findIndex(
        (el) => el.id === action.payload.id
      );
      if (index !== -1) {
        state.elements[index] = action.payload;
      }
    },
    // Add other reducers as necessary
  },
});

export const { addElement, updateElement } = elementsSlice.actions;

export default elementsSlice.reducer;
