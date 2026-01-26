import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  defaultClothingItems,
  coordinates,
  apiKey,
} from "../../utils/constants.js";
import Header from "../Header/Header";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    condition: "",
    city: "",
    isDay: false,
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

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

  const handleAddItemSubmit = (item) => {
    setClothingItems((prevItems) => [item, ...prevItems]);
    setActiveModal("");
  };

  const handleCardDelete = () => {
    setClothingItems((prevItems) =>
      prevItems.filter((item) => item._id !== cardToDelete._id),
    );

    setIsConfirmModalOpen(false);
    setActiveModal("");
    setCardToDelete(null);
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = processWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
