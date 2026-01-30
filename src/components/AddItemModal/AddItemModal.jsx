import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

const initialValues = {
  imageName: "",
  imageUrl: "",
  weather: "",
};

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      resetForm(initialValues, {}, false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItem({
      name: values.imageName,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="garment-name" className="modal__label">
        Name {""}
        <input
          className="modal__input"
          id="garment-name"
          name="imageName"
          value={values.imageName}
          onChange={handleChange}
          type="text"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
        />
      </label>
      <label
        className={`modal__label ${errors.imageUrl ? "modal__label_error" : ""}`}
      >
        Image {errors.imageUrl && <span>({errors.imageUrl})</span>}
        <input
          className={`modal__input ${errors.imageUrl ? "modal__input_error" : ""}`}
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__label modal__label_type_radio">
            <input
              className="modal__input modal__input_type_radio"
              type="radio"
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              required
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
