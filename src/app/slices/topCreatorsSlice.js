import { createSlice } from "@reduxjs/toolkit";

const topCreatorsSlice = createSlice({
  name: "topCreators",
  initialState: {
    topCreators: [],
  },
  reducers: {
    setTopCreators: (state, action) => {
      return {
        ...state,
        topCreators: action.payload,
      };
    },
  },
});

export const { setTopCreators } = topCreatorsSlice.actions;

export default topCreatorsSlice.reducer;
