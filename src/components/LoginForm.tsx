import { useState, type SetStateAction } from "react";

export default function LoginForm({
  setLoggedInUser,
}: {
  setLoggedInUser: React.Dispatch<SetStateAction<string | undefined>>;
}) {
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
          body: JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          }),
        },
      );
      const result = await response.json();
      console.log("result:", result);
      localStorage.setItem("token", result.token);
      setLoggedInUser(formValues.email);
    } catch (error) {
      console.error("There was a login error:", error);
    }
    console.log("form submitted", formValues);
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <label>
        Email
        <input
          id="email"
          value={formValues.email}
          type="email"
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
        <p id="error" role="alert">
          {error.email}
        </p>
      </label>
      <label>
        Password
        <input
          id="password"
          value={formValues.password}
          type="password"
          autoComplete="password"
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
        <p id="error" role="alert">
          {error.password}
        </p>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
