import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import CloseButton from "./CloseButton";
import type { FormErrors, LoginValues } from "../types";

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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: formValues.password,
          }),
        },
      );

      if (!response.ok) {
        setError({ password: "Invalid email or password." });
        return;
      }
      const user = await response.json();

      setLoggedInUser(user.email);
      setUiState("empty");
    } catch (error) {
      console.error("There was a login error:", error);
      setError({ password: "Something went wrong, please try again." });
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
