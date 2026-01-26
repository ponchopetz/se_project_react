import "./ItemModal.css";
import { useRef } from "react";
import { useModalClose } from "../../hooks/useModalClose.js";

function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
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
        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div className="item-modal__container">
            <p className="item-modal__caption">{card.name}</p>
            <button
              type="button"
              className="item-modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          </div>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
