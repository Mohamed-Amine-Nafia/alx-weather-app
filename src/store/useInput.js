import { create } from "zustand";

export const useInput = create((set) => {
  return {
    inputValue: "",
    setInputValue: (value) => set({ inputValue: value }),
  };
});
