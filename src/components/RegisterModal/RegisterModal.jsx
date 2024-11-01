import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ activeModal, onClose, onRegister, handleLogin }) {
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
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={activeModal === "register"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="registerEmail" className="modal__label">
        Email
        <input
          id="registerEmail"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password
        <input
          id="registerPassword"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="registerName" className="modal__label">
        Name
        <input
          id="registerName"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="registerAvatarUrl" className="modal__label">
        Avatar URL
        <input
          id="registerAvatarUrl"
          name="avatarUrl"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          required
        />
      </label>
      <div className="modal__register-buttons">
        <button
          className="modal__register-login-btn"
          type="button"
          onClick={handleLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
