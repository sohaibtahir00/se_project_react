import { useState } from "react";
import "./RegisterModal.css";
import closePreview from "../../assets/close-btn.svg";

function RegisterModal({ activeModal, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const isSubmitDisabled = !email || !password || !name || !avatarUrl;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar: avatarUrl, email, password });
  };

  return (
    <div
      className={`modal ${activeModal === "register" ? "modal_opened" : ""}`}
    >
      <div className="modal__register">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            src={closePreview}
            alt="close button"
            className="modal__close-btn-img"
          />
        </button>
        <h2 className="modal__register-title">Sign Up</h2>
        <form className="modal__register-inputs" onSubmit={handleSubmit}>
          <label htmlFor="registerEmail">
            Email
            <input
              id="registerEmail"
              name="email"
              type="email"
              className="modal__label"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="registerPassword">
            Password
            <input
              id="registerPassword"
              name="password"
              type="password"
              className="modal__label"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="registerName">
            Name
            <input
              id="registerName"
              name="name"
              type="text"
              className="modal__label"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="registerAvatarUrl">
            Avatar URL
            <input
              id="registerAvatarUrl"
              name="avatarUrl"
              type="url"
              className="modal__label"
              placeholder="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              required
            />
          </label>
          <div className="modal__register-buttons">
            <button
              className="modal__register-signup-btn"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Sign Up
            </button>
            <button
              className="modal__register-login-btn"
              type="button"
              onClick={onClose}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
