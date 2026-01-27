import "./Header.css";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";
import { getCurrentDate } from "../../utils/dateUtils.js";
import { useModalClose } from "../../hooks/useModalClose.js";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import MobileMenu from "./MobileMenu/MobileMenu.jsx";

function Header({ handleAddClick, weatherData }) {
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

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>

      <Link to="/profile" className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="User avatar" />
      </Link>

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
