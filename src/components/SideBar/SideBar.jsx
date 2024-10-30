import "./SideBar.css";
import { useNavigate } from "react-router-dom";

function SideBar({ onLogout, currentUser, onEditProfile }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt="User avatar"
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-profile"
          type="button"
          onClick={onEditProfile}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-profile" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
