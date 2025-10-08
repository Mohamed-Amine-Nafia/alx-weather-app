import { create } from "zustand";

export const useNotFound = create((set) => {
  return {
    isNotFound: false,
    setNotFound: (value) => set({ isNotFound: value }),
  };
});
