import { useState, useEffect } from "react";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, processWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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
      <div className="page__content">
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={handleCloseClick}
      >
        <label htmlFor="garment-name" className="modal__label">
          Name {""}
          <input
            className="modal__input"
            id="garment-name"
            name="imageName"
            type="text"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="garment-link" className="modal__label">
          Image {""}
          <input
            className="modal__input"
            id="garment-link"
            name="imageUrl"
            type="url"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label
            htmlFor="hot-radio"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="hot-radio"
              type="radio"
              name="weather"
              className="modal__input modal__input_type_radio"
            />
            Hot
          </label>
          <label
            htmlFor="warm-radio"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm-radio"
              type="radio"
              name="weather"
              className="modal__input modal__input_type_radio"
            />
            Warm
          </label>
          <label
            htmlFor="cold-radio"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold=radio"
              type="radio"
              name="weather"
              className="modal__input modal__input_type_radio"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={handleCloseClick}
      />
    </div>
  );
}

export default App;
