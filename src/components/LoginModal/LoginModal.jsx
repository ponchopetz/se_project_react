import { useEffect, useRef } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

const initialValues = { email: "", password: "" };

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
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

    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
      formRef={formRef}
      secondaryText={"or Sign Up"}
      onSecondaryAction={onSwitchToRegister}
    >
      <label
        className={`modal__label ${errors.email ? "modal__label_error" : ""}`}
      >
        Email {errors.email && <span>(Please enter a valid email.)</span>}
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
        Password {errors.password && <span>(Please enter a password.)</span>}
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
    </ModalWithForm>
  );
}

export default LoginModal;
