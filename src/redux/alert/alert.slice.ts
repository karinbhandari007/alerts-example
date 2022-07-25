import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertType = "error" | "warning" | "info" | "success";

export type Alert = {
  id: string;
  title: string;
  text: string;
  link: string;
  timeLimit: number;
  type: AlertType;
};

export type AlertState = {
  list: Alert[];
};

const initialState: AlertState = {
  list: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlert: (state: AlertState, action: PayloadAction<Alert>) => {
      const existingAlerts = JSON.parse(JSON.stringify(state.list));
      const newAlerts = [
        ...existingAlerts,
        {
          ...action.payload,
          timeLimit:
            action.payload.timeLimit *
            1000 /** Converting seconds to milliseconds */,
        },
      ];
      state = {
        list: newAlerts,
      };
      return state;
    },
    closeAlert: (
      state: AlertState,
      action: PayloadAction<{ alertId: string }>
    ) => {
      const alertId = action.payload.alertId;
      const existingAlerts = JSON.parse(JSON.stringify(state.list));
      state = {
        list: existingAlerts
          .map((alert: Alert) => (alert.id !== alertId ? alert : null))
          .filter(Boolean),
      };
      return state;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
