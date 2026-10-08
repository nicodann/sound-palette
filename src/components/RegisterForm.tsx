import { useId, useState } from "react";
import type { FormErrors, RegisterValues } from "../types";

import { useAppContext } from "../context/useAppContext";
import CloseButton from "./CloseButton";
import { register } from "../api/auth";
import { ApiError } from "../api/client";

export default function RegisterForm() {
  const { setLoggedInUser, setUiState } = useAppContext();

  const [formValues, setFormValues] = useState<RegisterValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<FormErrors<RegisterValues>>({});

  const idEmail = useId();
  const idPassword = useId();
  const idConfirmPassword = useId();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors<RegisterValues> = {};

    const email = formValues.email.trim();

    if (!email) {
      newErrors.email = "Please enter your e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid e-mail";
    }

    if (!formValues.password) {
      newErrors.password = "Please enter your password";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "The passwords do not match";
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setError(newErrors);
      return;
    }

    setError({});
    console.log("form submitted", formValues);

    try {
      const user = await register({ email, password: formValues.password });
      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/auth/register`,
      //   {
      //     method: "POST",
      //     credentials: "include",
      //     headers: { "Content-type": "application/json" },
      //     body: JSON.stringify({
      //       email: email,
      //       password: formValues.password,
      //     }),
      //   },
      // );

      // if (response.status === 409) {
      //   setError({ email: "An account with this email already exists." });
      //   return;
      // }
      // if (!response.ok) {
      //   setError({ password: "Registration server error, please try again." });
      //   return;
      // }
      // const user = await response.json();

      setLoggedInUser(user.email);
      setUiState("empty");
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setError({ email: "AAn account with this email already exists." });
      } else if (error instanceof ApiError && error.status === 400) {
        setError({ password: error.message });
      } else {
        console.error("Error in registration submit", error);
        setError({
          confirmPassword: "Something went wrong, please try again.",
        });
      }
    }
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={idEmail}>Email</label>
        <input
          id={`${idEmail}`}
          type="email"
          aria-invalid={!!error.email}
          aria-describedby={`${idEmail}-error`}
          value={formValues.email}
          autoComplete="email"
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, email: "" };
            });
            setFormValues((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <p
          className="error"
          id={`${idEmail}-error`}
          role="alert"
          hidden={!error.email}
        >
          {error.email}
        </p>
      </div>
      <div className="field">
        <label htmlFor={idPassword}>Password</label>
        <input
          onKeyDown={(e) =>
            console.log("key:", e.key, "prevented:", e.defaultPrevented)
          }
          id={idPassword}
          type="password"
          aria-invalid={!!error.password}
          aria-describedby={`${idPassword}-hint ${idPassword}-error`}
          value={formValues.password}
          autoComplete="new-password"
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, password: "" };
            });
            setFormValues((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <p id={`${idPassword}-hint`} className="field-hint">
          At least 8 characters.
        </p>
        <p
          className="error"
          id={`${idPassword}-error`}
          role="alert"
          hidden={!error.password}
        >
          {error.password}
        </p>
      </div>
      <div className="field">
        <label htmlFor={idConfirmPassword}>Confirm Password</label>
        <input
          onKeyDown={(e) =>
            console.log("key:", e.key, "prevented:", e.defaultPrevented)
          }
          id={idConfirmPassword}
          type="password"
          aria-invalid={!!error.confirmPassword}
          aria-describedby={`${idConfirmPassword}-error`}
          value={formValues.confirmPassword}
          autoComplete="new-password"
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, confirmPassword: "" };
            });
            setFormValues((prev) => {
              return { ...prev, confirmPassword: e.target.value };
            });
          }}
        />
        <p
          className="error"
          id={`${idConfirmPassword}-error`}
          role="alert"
          hidden={!error.confirmPassword}
        >
          {error.confirmPassword}
        </p>
      </div>
      <button type="submit">Submit</button>
      <CloseButton />
    </form>
  );
}
