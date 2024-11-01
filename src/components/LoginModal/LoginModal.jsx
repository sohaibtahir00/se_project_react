import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  activeModal,
  onClose,
  onLogin,
  loginError,
  handleRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSubmitDisabled = !email || !password;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={activeModal === "login"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email
        <input
          id="loginEmail"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        Password
        <input
          id="loginPassword"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {loginError && <p className="modal__error-message">{loginError}</p>}
      <div className="modal__login-buttons">
        <button
          className="modal__login-signup-btn"
          type="button"
          onClick={handleRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
