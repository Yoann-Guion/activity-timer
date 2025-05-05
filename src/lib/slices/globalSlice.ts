import { StateCreator } from "zustand";

export type GlobalSliceState = {
  isRehydrated: boolean;
  setIsRehydrated: (value: boolean) => void;
};

export const createGlobalSlice: StateCreator<
  GlobalSliceState,
  [],
  [],
  GlobalSliceState
> = (set) => ({
  isRehydrated: false,
  setIsRehydrated: (value) => set({ isRehydrated: value }),
});
