import "./Header.css";
import { useRef, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../assets/wtwr_logo.svg";
import { getCurrentDate } from "../../utils/dateUtils.js";
import { useModalClose } from "../../hooks/useModalClose.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import MobileMenu from "./MobileMenu/MobileMenu.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
  onSignInClick,
  onRegisterClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const menuRef = useRef(null);

  const closeMenu = () => setIsMobileMenuOpened(false);

  useModalClose({
    isOpen: isMobileMenuOpened,
    onClose: closeMenu,
    overlayRef: menuRef,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const location = useLocation();
  const isProfile = location.pathname === "/profile";

  return (
    <header className={`header ${isProfile ? "header__profile" : ""}`}>
      <div className="header__left">
        <Link to="/">
          <img className="header__logo" src={headerLogo} alt="WTWR logo" />
        </Link>
        <p className="header__date-and-location">
          {getCurrentDate()}, {weatherData.city}
        </p>
      </div>

      <div className="header__toggle-wrapper">
        <ToggleSwitch />
      </div>

      {currentUser && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
      )}

      {currentUser ? (
        <Link to="/profile" className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
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
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onSignInClick}
          >
            Sign in
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Register
          </button>
        </div>
      )}

      <button
        className={`header__menu-btn ${
          isMobileMenuOpened ? "header__menu-btn_opened" : ""
        }`}
        type="button"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpened ? "✕" : "☰"}
      </button>

      <MobileMenu
        isOpen={isMobileMenuOpened}
        onClose={closeMenu}
        handleAddClick={handleAddClick}
        menuRef={menuRef}
      />
    </header>
  );
}

export default Header;
