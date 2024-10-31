import { useState } from "react";
import "./LoginModal.css";
import closePreview from "../../assets/close-btn.svg";

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
    <div className={`modal ${activeModal === "login" ? "modal_opened" : ""}`}>
      <div className="modal__login">
        <button className="modal__close-btn" type="button" onClick={onClose}>
          <img
            src={closePreview}
            alt="close button"
            className="modal__close-btn-img"
          />
        </button>
        <h2 className="modal__login-title">Log In</h2>
        <form className="modal__login-inputs" onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">
            Email
            <input
              id="loginEmail"
              name="email"
              type="email"
              className="modal__label"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="loginPassword">
            Password
            <input
              id="loginPassword"
              name="password"
              type="password"
              className="modal__label"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {loginError && <p className="modal__error-message">{loginError}</p>}
          <div className="modal__login-buttons">
            <button
              className="modal__login-btn"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Log In
            </button>
            <button
              className="modal__login-signup-btn"
              type="button"
              onClick={handleRegister}
            >
              or Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
