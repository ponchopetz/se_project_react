import "./ModalWithForm.css";
import { useRef } from "react";
import { useModalClose } from "../../hooks/useModalClose.js";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  formRef,
}) {
  const overlayRef = useRef(null);

  useModalClose({
    isOpen,
    onClose,
    overlayRef,
  });

  return (
    <div
      ref={overlayRef}
      className={`modal modal_type_form ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <form
          noValidate
          ref={formRef}
          className="modal__form"
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`modal__submit${
              isValid ? " modal__submit_enabled" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
