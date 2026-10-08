import type { LoginValues, User } from "../types";
import { apiFetch } from "./client";

export function login({ email, password }: LoginValues) {
  return apiFetch<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function register({ email, password }: LoginValues) {
  return apiFetch<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export const getCurrentUser = () => apiFetch<User>("/auth/me");

export const logout = () => {
  return apiFetch<void>("auth/logout");
};
