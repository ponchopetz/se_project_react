import { useEffect, useRef, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const initialValues = { name: "", avatar: "" };

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);

  const formRef = useRef(null);

  const { values, errors, isValid, handleChange, validateForm, resetForm } =
    useForm(initialValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        { name: currentUser.name, avatar: currentUser.avatar },
        {},
        true,
      );
    }
  }, [isOpen, resetForm, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formRef.current)) {
      return;
    }

    onUpdateUser({
      name: values.name,
      avatar: values.avatar,
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      formRef={formRef}
    >
      <label
        className={`modal__label ${errors.name ? "modal__label_error" : ""}`}
      >
        Name {errors.name && <span>(Please enter your name.)</span>}
        <input
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          name="name"
          value={values.name}
          onChange={handleChange}
          type="text"
          required
          placeholder="Name"
        />
      </label>
      <label
        className={`modal__label ${errors.avatar ? "modal__label_error" : ""}`}
      >
        Avatar URL {errors.avatar && <span>(Please enter an avatar URL.)</span>}
        <input
          className={`modal__input ${errors.avatar ? "modal__input_error" : ""}`}
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          type="url"
          required
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
