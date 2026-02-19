"use server";

import { hashUserPassword, verifyPassword } from "@/lib/hash.js";
import { createUser, getUserByEmail } from "../lib/user";
import { redirect } from "next/navigation";
import { createAuthSession, destroyAuthSession } from "@/lib/auth.js";

export async function signup(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Email must be valid";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const userID = createUser({ email, hashedPassword });
    await createAuthSession(userID);
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { errors: { email: "Email already exists" } };
    }
    throw err;
  }

  redirect("/training");
}

export async function login(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: { email: "Invalid credentials." },
    };
  }

  const isPasswordValid = verifyPassword(existingUser.password, password);

  if (!isPasswordValid) {
    return {
      errors: { password: "Invalid credentials." },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(_, formData) {
  const mode = formData.get("mode");

  if (mode === "login") {
    return login(_, formData);
  }

  return signup(_, formData);
}

export async function logout() {
  await destroyAuthSession();
  redirect("/");
}