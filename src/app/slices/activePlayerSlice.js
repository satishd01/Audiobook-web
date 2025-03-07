import { createSlice } from "@reduxjs/toolkit";

const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState: {
    activePlayer: null,
    playNext: [],
    history: [],
    playMode: 0,
  },
  reducers: {
    setActivePlayer: (state, action) => {
      state.activePlayer = action.payload;
    },
    addToHistory: (state, action) => {
      if (state.history[state.history.length - 1]?.id !== action.payload.id) {
        state.history.push(action.payload);
      }
    },
    removeFromPlayNext: (state, action) => {
      state.playNext = state.playNext.filter(
        (song) => song.id !== action.payload
      );
    },
    reorderPlayNext: (state, action) => {
      state.playNext = action.payload;
    },
    togglePlayMode: (state) => {
      state.playMode = (state.playMode + 1) % 3;
    },
  },
});

export const {
  setActivePlayer,
  addToHistory,
  removeFromPlayNext,
  reorderPlayNext,
  togglePlayMode,
} = activePlayerSlice.actions;

export default activePlayerSlice.reducer;
