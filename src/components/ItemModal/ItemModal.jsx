import "./ItemModal.css";
import closePreview from "../../assets/preview-close-btn.svg";

function ItemModal({ activeModal, card, onClose }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            src={closePreview}
            alt="close button"
            className="modal__close-btn"
          />
        </button>
        <img src={card.link} alt="card link" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
