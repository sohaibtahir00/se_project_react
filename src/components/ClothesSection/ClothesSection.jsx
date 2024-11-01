import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__content">
        <p>Your items</p>
        <button
          type="button"
          className="clothes-section__btn"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item, index) => (
          <ItemCard
            key={item._id || item.name || index}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
