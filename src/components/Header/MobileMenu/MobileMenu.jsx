import "./MobileMenu.css";
import avatar from "../../../assets/avatar.png";

function MobileMenu({ isOpen, handleAddClick, menuRef }) {
  return (
    <div
      ref={menuRef}
      className={`mobile-menu-overlay ${
        isOpen ? "mobile-menu-overlay_opened" : ""
      }`}
    >
      <div className="mobile-menu">
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
    </div>
  );
}

export default MobileMenu;
