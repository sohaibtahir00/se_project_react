import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarPlaceholder from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  handleAddClick,
  weatherData,
  handleRegister,
  handleLogin,
  isLoggedIn,
  currentUser,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch className="header__toggleswitch" />

      {!isLoggedIn ? (
        <>
          <button
            className="header__signup-btn"
            type="button"
            onClick={handleRegister}
          >
            Sign Up
          </button>
          <button
            className="header__login-btn"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                src={currentUser?.avatar || avatarPlaceholder}
                alt="user avatar"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
