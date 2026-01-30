import { useState, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    const form = e.target.closest("form");

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));

    if (form) {
      setIsValid(form.checkValidity());
    }
  };

  // 👇 NEW: validate entire form on submit
  const validateForm = (form) => {
    const inputs = Array.from(form.elements).filter((el) => el.name);

    const newErrors = {};
    let valid = true;

    inputs.forEach((input) => {
      // Special handling for radio groups
      if (input.type === "radio") {
        if (!form.querySelector(`input[name="${input.name}"]:checked`)) {
          newErrors[input.name] = true; // Just a flag, not a message
          valid = false;
        }
        return;
      }

      if (!input.validity.valid) {
        newErrors[input.name] = input.validationMessage;
        valid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(valid);

    return valid;
  };

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [initialValues],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    validateForm,
    resetForm,
  };
}
