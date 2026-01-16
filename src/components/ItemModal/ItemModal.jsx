import "./ItemModal.css";
import { useRef } from "react";
import { useModalClose } from "../../hooks/useModalClose.js";

function ItemModal({ isOpen, card, onClose }) {
  const overlayRef = useRef(null);

  useModalClose({
    isOpen,
    onClose,
    overlayRef,
  });

  return (
    <div ref={overlayRef} className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_preview">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
