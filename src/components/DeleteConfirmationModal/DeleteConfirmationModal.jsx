import "./DeleteConfirmationModal.css";
import { useRef } from "react";
import { useModalClose } from "../../hooks/useModalClose";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const overlayRef = useRef(null);

  useModalClose({
    isOpen,
    onClose,
    overlayRef,
  });

  return (
    <div ref={overlayRef} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_confirm "
        ></button>
        <p className="confirm-modal__text">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>
        <button
          type="button"
          className="confirm-modal__confirm"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="confirm-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
