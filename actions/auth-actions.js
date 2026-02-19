"use server";

import { hashUserPassword } from "@/lib/hash.js";
import { createUser } from "../lib/user";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/auth.js";

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