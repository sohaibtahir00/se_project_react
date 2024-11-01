import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile.jsx";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { register, login, checkToken } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [loginError, setLoginError] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleRegisterSubmit = (data) => {
    register(data)
      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        setCurrentUser({ name: data.name, avatar: data.avatar });
        localStorage.setItem("token", res.token);
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLoginSubmit = (data) => {
    login(data)
      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        localStorage.setItem("token", res.token);
        setLoginError("");
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => {
        setLoginError("Incorrect email or password");
      });
  };

  const handleEditProfileSubmit = (updatedUserData) => {
    updateUserProfile(updatedUserData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((response) => {
        const addedItem = response.data;

        if (addedItem && addedItem.imageUrl && addedItem.name) {
          setClothingItems([addedItem, ...clothingItems]);
        } else {
          console.error(
            "Added item is missing necessary properties:",
            addedItem
          );
        }
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("token");

    !isLiked
      ? addCardLike(id, token)
          .then((response) => {
            const updatedCard = response.data;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log("Error liking card:", error))
      : removeCardLike(id, token)
          .then((response) => {
            const updatedCard = response.data;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((error) => console.log("Error unliking card:", error));
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleLogin = () => {
    setActiveModal("login");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    onEditProfile={handleEditProfile}
                    onCardLike={handleCardLike}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />
        <RegisterModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          onRegister={handleRegisterSubmit}
          handleLogin={handleLogin}
        />
        <LoginModal
          activeModal={activeModal}
          onClose={closeActiveModal}
          onLogin={handleLoginSubmit}
          loginError={loginError}
          handleRegister={handleRegister}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onUpdateUser={handleEditProfileSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
