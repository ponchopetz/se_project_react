import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const { values, handleChange, resetForm } = useForm({
    imageName: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItem({
      _id: Date.now(),
      name: values.imageName,
      link: values.imageUrl,
      weather: values.weather,
    });
    resetForm();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="garment-link" className="modal__label">
        Image {""}
        <input
          className="modal__input"
          id="garment-link"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          type="url"
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              required
            />
            {type}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
