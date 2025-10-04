import { create } from "zustand";

export const useNotification = create((set) => {
  return {
    Notification: false,
    setNotification: (value) => set({ Notification: value }),
  };
});
