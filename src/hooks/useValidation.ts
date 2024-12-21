import {
  validateEmail,
  validateMobile,
  validatePassword,
} from "@/utils/validation";
import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (
    field: string,
    value: string,
    password?: string
  ): boolean => {
    let error = "";

    if (!value) {
      error = `${field} is required.`;
    } else if (field === "email") {
      if (!validateEmail(value)) error = "Invalid email format.";
    } else if (field === "password") {
      if (!validatePassword(value))
        error =
          "Password must have Minimum 8 chars, 1 uppercase, 1 lowercase, 1 special character.";
    } else if (field === "confirmPassword") {
      if (value !== password) error = "Passwords do not match.";
    } else if (field === "mobile") {
      if (!validateMobile(value)) error = "Mobile must be 10 digits.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const resetErrors = () => setErrors({});

  return { errors, validate, resetErrors };
};

export default useValidation;
