import "./Header.css";
import headerLogo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar.png";
import { getCurrentDate } from "../../utils/dateUtils.js";

function Header({ handleAddClick, weatherData }) {
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
        <img className="header__avatar" src={avatar} alt="" />
      </div>
    </header>
  );
}

export default Header;
