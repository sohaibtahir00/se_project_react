import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";
import closePreview from "../../assets/close-btn.svg";

function EditProfileModal({ isOpen, onClose, onUpdateUser, currentUser }) {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      avatar: avatarUrl,
    });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__edit">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            src={closePreview}
            alt="close button"
            className="modal__close-btn-img"
          />
        </button>
        <h2 className="modal__edit-title">Change profile data</h2>
        <form className="modal__edit-inputs" onSubmit={handleSubmit}>
          <label htmlFor="editName">
            Name
            <input
              id="editName"
              type="text"
              className="modal__label"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="editAvatarUrl">
            Avatar URL
            <input
              id="editAvatarUrl"
              type="url"
              className="modal__label"
              placeholder="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              required
            />
          </label>
          <div className="modal__edit-buttons">
            <button className="modal__edit-btn" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
