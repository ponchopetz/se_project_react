import "./MobileMenu.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function MobileMenu({
  isOpen,
  handleAddClick,
  menuRef,
  onSignInClick,
  onRegisterClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div
      ref={menuRef}
      className={`mobile-menu-overlay ${isOpen ? "mobile-menu-overlay_opened" : ""}`}
    >
      <div className="mobile-menu">
        {currentUser ? (
          <>
            <Link to="/profile" className="mobile-menu__user-container">
              <p className="mobile-menu__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="User avatar"
                />
              ) : (
                <div className="header__avatar">{currentUser.name?.[0]}</div>
              )}
            </Link>
            <button
              onClick={handleAddClick}
              type="button"
              className="mobile-menu__add-btn"
            >
              + Add Clothes
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="mobile-menu__auth-btn"
              onClick={onSignInClick}
            >
              Sign in
            </button>
            <button
              type="button"
              className="mobile-menu__auth-btn"
              onClick={onRegisterClick}
            >
              Register
            </button>
          </>
        )}
        <div className="mobile-menu__toggle-wrapper">
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
