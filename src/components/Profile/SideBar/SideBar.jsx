import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser.name?.[0]}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-btn"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__logout-btn" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
}

export default SideBar;
