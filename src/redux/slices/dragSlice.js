import { createSlice } from "@reduxjs/toolkit";

export const dragSlice = createSlice({
  name: "dragSlice",
  initialState: {
    indexDragStart: 0,
    indexDrop: 0,
  },
  reducers: {
    setIndexDragStart: (state, action) => {
      const { index } = action.payload;
      state.indexDragStart = index;
    },
    setIndexDrop: (state, action) => {
      const { index } = action.payload;
      state.indexDrop = index;
    },
  },
});

export const { setIndexDragStart, setIndexDrop } = dragSlice.actions;
