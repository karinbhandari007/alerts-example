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

/**
 * @description initial alert state
 */
const initialState: AlertState = {
  list: [],
};

/**
 * @description creating alert slice
 */
export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    /**
     * @description appends alert to the existing alert list
     */
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
    /**
     * @description removes alert from alert list based on provided alert id
     */
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
