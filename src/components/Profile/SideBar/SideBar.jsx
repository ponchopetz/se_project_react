import "./SideBar.css";
import avatar from "../../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
