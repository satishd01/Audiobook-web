import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./slices/sliderSlice";
import activeTabReducer from "./slices/activeTabSlice";
import searchReducer from "./slices/searchSlice";
import activePlayerReducer from "./slices/activePlayerSlice";
import notificationReducer from "./slices/notificationSlice";
import addContentReducer from "./slices/addContentSlice";
import topCreatorsReducer from "./slices/topCreatorsSlice";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    activeTab: activeTabReducer,
    activePlayer: activePlayerReducer,
    search: searchReducer,
    notification: notificationReducer,
    addContent: addContentReducer,
    topCreators: topCreatorsReducer,
  },
});
