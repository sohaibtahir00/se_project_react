import "./ItemModal.css";
import closePreview from "../../assets/preview-close-btn.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = currentUser && currentUser._id === card.owner;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            src={closePreview}
            alt="close button"
            className="modal__close-btn-img"
          />
        </button>
        <img src={card.imageUrl} alt="card link" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwner && (
            <button
              type="button"
              className="card__delete-btn"
              onClick={() => onDelete(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
