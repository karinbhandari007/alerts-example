import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alert/alert.slice";

/**
 * @description setting up redux store
 */
export const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
