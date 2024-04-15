import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddelware) => {
    getDefaultMiddelware({
      serializableCheck: false
    });
  }
});