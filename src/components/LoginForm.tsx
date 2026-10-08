import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import type { FormErrors, LoginValues } from "../types";
import CloseButton from "./CloseButton";
import { login } from "../api/auth";
import { ApiError } from "../api/client";

export default function LoginForm() {
  const { setLoggedInUser, setUiState } = useAppContext();

  const [formValues, setFormValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<FormErrors<LoginValues>>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors<LoginValues> = {};

    const email = formValues.email.trim();

    if (!email) {
      newErrors.email = "Please enter your e-mail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid e-mail";
    }

    if (!formValues.password) {
      newErrors.password = "Please enter your password";
    }

    if (newErrors.email || newErrors.password) {
      setError(newErrors);
      return;
    }

    setError({});

    try {
      const user = await login({ email, password: formValues.password });

      setLoggedInUser(user.email);
      setUiState("empty");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setError({ password: "Invalid email or password." });
      } else {
        console.error("There was a login error:", error);
        setError({ password: "Something went wrong, please try again." });
      }
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={!!error.email}
          aria-describedby="email-error"
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
          id="email-error"
          role="alert"
          hidden={!error.email}
        >
          {error.email}
        </p>
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          onKeyDown={(e) =>
            console.log("key:", e.key, "prevented:", e.defaultPrevented)
          }
          id="password"
          type="password"
          aria-invalid={!!error.password}
          aria-describedby="password-error"
          value={formValues.password}
          autoComplete="current-password"
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, password: "" };
            });
            setFormValues((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <p
          className="error"
          id="password-error"
          role="alert"
          hidden={!error.password}
        >
          {error.password}
        </p>
      </div>
      <button type="submit">Submit</button>
      <CloseButton />
    </form>
  );
}
