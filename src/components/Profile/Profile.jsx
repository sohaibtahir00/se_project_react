import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  currentUser,
  onEditProfile,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          currentUser={currentUser}
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          currentUser={currentUser}
        />
      </section>
    </div>
  );
}

export default Profile;
