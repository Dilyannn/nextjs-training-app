"use client";

import { createUser } from "../lib/user";

export async function signup(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  
  let errors = {};

  if (email.includes("@") === false) {
    errors.email = "Email must be valid";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  } 

  createUser({ email, password });

  if (!response.ok) {
    const errorData = await response.json();
    return { errors: errorData.errors };
  }

  const data = await response.json();
  return { data };
}