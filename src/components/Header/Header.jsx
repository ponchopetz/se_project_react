import { useState } from "react";
import "./Header.css";
import headerLogo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";
import { getCurrentDate } from "../../utils/dateUtils.js";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="WTWR logo" />
      <p className="header__date-and-location">
        {getCurrentDate()}, {weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="User avatar" />
      </div>

      {/* Mobile menu button */}
      <button
        className={`header__menu-btn ${
          isMobileMenuOpened ? "header__menu-btn_opened" : ""
        }`}
        type="button"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpened ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${
          isMobileMenuOpened ? "mobile-menu_opened" : ""
        }`}
      >
        <div className="mobile-menu__user-container">
          <p className="mobile-menu__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="mobile-menu__add-btn"
        >
          + Add Clothes
        </button>
      </div>
    </header>
  );
}

export default Header;
