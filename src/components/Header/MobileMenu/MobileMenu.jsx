import "./MobileMenu.css";
import { Link } from "react-router-dom";
import avatar from "../../../assets/avatar.png";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";

function MobileMenu({ isOpen, handleAddClick, menuRef }) {
  return (
    <div
      ref={menuRef}
      className={`mobile-menu-overlay ${
        isOpen ? "mobile-menu-overlay_opened" : ""
      }`}
    >
      <div className="mobile-menu">
        <Link to="/profile" className="mobile-menu__user-container">
          <p className="mobile-menu__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </Link>

        <button
          onClick={handleAddClick}
          type="button"
          className="mobile-menu__add-btn"
        >
          + Add Clothes
        </button>
        <div className="mobile-menu__toggle-wrapper">
          <ToggleSwitch className="mobile-menu__toggle" />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
