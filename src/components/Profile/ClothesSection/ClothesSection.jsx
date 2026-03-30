import { useContext } from "react";
import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";

function ClothesSection({ clothingItems, handleAddClick, handleCardClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-btn"
          onClick={handleAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>

      <ul className="cards-list">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
