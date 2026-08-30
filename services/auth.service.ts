import { apiFetch } from "./api";

export async function registerUser(login: string, password: string) {
  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid email/mobile or password");
  }

  return data;
}

export async function loginUser(login: string, password: string) {
  const response = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
