import { apiFetch } from "./api";
import type { User } from "@/store/authStore";

export async function getProfile(): Promise<User> {
  const response = await apiFetch("/profile");

  return response.json();
}

export async function updateProfile(data: Partial<User>) {
  const response = await apiFetch("/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return response.json();
}
