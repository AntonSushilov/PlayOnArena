import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from "../index";

export const useAppSelector = <T>(fn: (state: RootState) => T) => useSelector<RootState, T>(fn);
// export const useRootSelector : TypedUseSelectorHook<RootState> = selectorHook

// export const useSelector : TypedUseSelectorHook<RootState> = selectorHook