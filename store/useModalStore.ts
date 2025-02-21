import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
