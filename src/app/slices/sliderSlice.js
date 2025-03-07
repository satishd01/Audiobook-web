import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    isSliderOpen: true,
  },
  reducers: {
    toggleSlider: (state, action) => {
      return {
        ...state,
        isSliderOpen: action.payload,
      };
    },
  },
});

export const { toggleSlider } = sliderSlice.actions;

export default sliderSlice.reducer;
