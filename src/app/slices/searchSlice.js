import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchedText: null,
  },
  reducers: {
    setSearchedText: (state, action) => {
      return {
        ...state,
        searchedText: action.payload,
      };
    },
  },
});

export const { setSearchedText } = searchSlice.actions;

export default searchSlice.reducer;
