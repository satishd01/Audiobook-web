import { createSlice } from "@reduxjs/toolkit";

const addContentSlice = createSlice({
  name: "addContent",
  initialState: {
    isAddContentOpen: false,
  },
  reducers: {
    toggleAddContent: (state, action) => {
      return {
        ...state,
        isAddContentOpen: action.payload,
      };
    },
  },
});

export const { toggleAddContent } = addContentSlice.actions;

export default addContentSlice.reducer;
