import { useState } from "react";

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  return (
    <form id="loginForm">
      <label>
        Email
        <input
          id="email"
          value={formValues.email}
          type="email"
          autoComplete="email"
          required
        />
      </label>
      <label>
        Password
        <input
          id="password"
          value={formValues.password}
          type="password"
          autoComplete="password"
          required
        />
      </label>
    </form>
  );
}
