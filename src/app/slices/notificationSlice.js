// src/app/slices/notificationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    isNotificationOpen: false,
    notifications: [],
  },
  reducers: {
    toggleNotification: (state) => {
      state.isNotificationOpen = !state.isNotificationOpen;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { toggleNotification, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;