import { User } from "./types";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/users");
  return res.json();
}

export async function addUser(user: Omit<User, "id">): Promise<void> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Failed to add user");
  }
}
