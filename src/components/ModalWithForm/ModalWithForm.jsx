import "./ModalWithForm.css"
import closeButton from "../../assets/close-btn.svg"

function ModalWithForm({ children, title, buttonText, activeModal, onClose }) {
    return (
        <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
            <div className="modal__content">
            <h2 className="modal__title">{title}</h2>
            <button className="modal__close" type="button" onClick={onClose}>
                <img src={closeButton} alt="close button" className="modal__close-btn" /></button>
            <form action="" className="modal__form">
                {children}
                    <button className="modal__submit" type="submit">{buttonText}</button>
            </form>
            </div>
        </div>
    )
}

export default ModalWithForm;