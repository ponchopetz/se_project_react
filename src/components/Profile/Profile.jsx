import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  onEditProfileClick,
  onCardLike,
  onLogout,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
