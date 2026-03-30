import { useEffect, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

const initialValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
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

    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar,
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      formRef={formRef}
      secondaryText={"or Log In"}
      onSecondaryAction={onSwitchToLogin}
    >
      <label
        className={`modal__label ${errors.email ? "modal__label_error" : ""}`}
      >
        Email* {errors.email && <span>(Please enter a valid email.)</span>}
        <input
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          required
          placeholder="Email"
        />
      </label>
      <label
        className={`modal__label ${errors.password ? "modal__label_error" : ""}`}
      >
        Password* {errors.password && <span>(Please enter a password.)</span>}
        <input
          className={`modal__input ${errors.password ? "modal__input_error" : ""}`}
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          required
          placeholder="Password"
        />
      </label>
      <label
        className={`modal__label modal__label_spaced ${errors.name ? "modal__label_error" : ""}`}
      >
        Name * {errors.name && <span>(Please enter a name.)</span>}
        <input
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          name="name"
          value={values.name}
          onChange={handleChange}
          type="text"
          required
          minLength="2"
          placeholder="Name"
        />
      </label>
      <label
        className={`modal__label modal__label_spaced ${errors.avatar ? "modal__label_error" : ""}`}
      >
        Avatar URL *{" "}
        {errors.avatar && <span>(Please enter an avatar URL.)</span>}
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

export default RegisterModal;
