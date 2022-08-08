import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;

/**
 * @description selects active alerts list from the store
 */
export const alertSelector = createSelector(
  selectSelf,
  (state: RootState) => state.alert.list
);
