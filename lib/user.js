import db from "./db";

export function createUser({ email, hashedPassword }) {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, hashedPassword);

  return result.lastInsertRowid;
}