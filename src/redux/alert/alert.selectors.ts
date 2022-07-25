import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectSelf = (state: RootState) => state;

export const alertSelector = createSelector(
  selectSelf,
  (state: RootState) => state.alert.list
);
