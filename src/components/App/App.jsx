import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { defaultCoordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { login, register, checkToken } from "../../utils/auth.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./App.css";

// Helper to get user coordinates
const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev == "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleOpenLoginModal = () => setActiveModal("login");
  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenEditProfileModal = () => setActiveModal("edit-profile");

  const handleLogin = ({ email, password }) => {
    login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register(name, avatar, email, password)
      .then(() => {
        return login(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleCardDelete = () => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id),
        );
        setIsConfirmModalOpen(false);
        setActiveModal("");
        setCardToDelete(null);
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(id)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const userCoords = await getUserCoordinates();
        const data = await getWeather(userCoords, apiKey);
        setWeatherData(processWeatherData(data));
      } catch (err) {
        console.warn("Falling back to default coordinates:", err);

        try {
          const data = await getWeather(defaultCoordinates, apiKey);
          setWeatherData(processWeatherData(data));
        } catch (fallbackErr) {
          console.error("Failed to fetch weather:", fallbackErr);
        }
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onSignInClick={handleOpenLoginModal}
              onRegisterClick={handleOpenRegisterModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onEditProfileClick={handleOpenEditProfileModal}
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
            onClose={handleCloseClick}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />
          <ItemModal
            card={selectedCard || {}}
            onClose={handleCloseClick}
            isOpen={activeModal === "preview"}
            onDeleteClick={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => {
              setIsConfirmModalOpen(false);
              setCardToDelete(null);
            }}
            onConfirm={handleCardDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseClick}
            onRegister={handleRegister}
            onSwitchToLogin={handleOpenLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseClick}
            onLogin={handleLogin}
            onSwitchToRegister={handleOpenRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseClick}
            onUpdateUser={handleUpdateUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
