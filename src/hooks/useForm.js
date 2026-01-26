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

  const resetForm = useCallback(
    (newValues = initialValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [initialValues],
  );

  return { values, errors, isValid, handleChange, resetForm };
}
