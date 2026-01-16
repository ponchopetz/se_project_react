import { useEffect } from "react";

export function useModalClose({ isOpen, onClose, overlayRef }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (evt) => {
      if (overlayRef.current && evt.target === overlayRef.current) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose, overlayRef]);
}
