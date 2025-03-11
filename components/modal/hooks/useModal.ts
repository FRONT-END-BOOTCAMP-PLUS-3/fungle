import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";

export const useModal = () => {
  const { isOpen, onClose } = useModalStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return { isOpen, onClose };
};
