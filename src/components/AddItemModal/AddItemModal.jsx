import { useEffect, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

const initialValues = {
  imageName: "",
  imageUrl: "",
  weather: "",
};

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const formRef = useRef(null);

  const { values, errors, isValid, handleChange, validateForm, resetForm } =
    useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      resetForm(initialValues, {}, false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formRef.current)) {
      return;
    }

    onAddItem({
      name: values.imageName,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      formRef={formRef}
    >
      {/* Name */}
      <label
        className={`modal__label ${errors.imageName ? "modal__label_error" : ""}`}
      >
        Name {errors.imageName && <span>(Please enter a name.)</span>}
        <input
          className={`modal__input ${
            errors.imageName ? "modal__input_error" : ""
          }`}
          name="imageName"
          value={values.imageName}
          onChange={handleChange}
          type="text"
          required
          minLength="2"
        />
      </label>

      {/* Image */}
      <label
        className={`modal__label ${errors.imageUrl ? "modal__label_error" : ""}`}
      >
        Image {errors.imageUrl && <span>({errors.imageUrl})</span>}
        <input
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          name="imageUrl"
          type="url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      {/* Weather */}
      <fieldset className="modal__radio-buttons">
        <legend
          className={`modal__legend ${errors.weather ? "modal__label_error" : ""}`}
        >
          {errors.weather && <span> (Please select a weather type.)</span>}
        </legend>

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
