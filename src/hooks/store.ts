import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
/**
 * @description hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * @description hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * @param {Function} selector the selector function
 *
 * @returns {any} the selected state
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
