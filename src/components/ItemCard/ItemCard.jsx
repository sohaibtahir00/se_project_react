import "./ItemCard.css";
import likeBtn from "../../assets/like.svg";
import likedBtn from "../../assets/liked.svg";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLiked = item.likes && item.likes.includes(currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__img-info">
        <h2 className="card__name">{item.name}</h2>
        <button className="card__like-btn" onClick={handleLike}>
          <img
            src={isLiked ? likedBtn : likeBtn}
            alt={isLiked ? "liked button" : "like button"}
            className="card__like-btn-img"
          />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
