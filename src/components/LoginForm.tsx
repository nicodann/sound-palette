import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

export default function LoginForm() {
  const { setLoggedInUser } = useAppContext();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.email.trim()) {
      setError((prev) => {
        return { ...prev, email: "Please enter some text." };
      });
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
            email: formValues.email,
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
    } catch (error) {
      console.error("There was a login error:", error);
      setError({ password: "Something went wrong, please try again." });
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={!!error.email}
          aria-describedby="email-error"
          value={formValues.email}
          autoComplete="email"
          required
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, email: "" };
            });
            setFormValues((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <p className="error" id="email-error" role="alert">
          {error.email}
        </p>
      </div>
      <div className="field">
        <label htmlFor="passord">Password</label>
        <input
          id="password"
          type="password"
          aria-invalid={!!error.password}
          aria-describedby="error-password"
          value={formValues.password}
          autoComplete="current-password"
          required
          onChange={(e) => {
            setError((prev) => {
              return { ...prev, password: "" };
            });
            setFormValues((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
        <p className="error" id="password-error" role="alert">
          {error.password}
        </p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
