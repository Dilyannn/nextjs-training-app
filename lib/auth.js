import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
  },
}); 

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId.toString(), {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  
  (await cookies()).set(
    sessionCookie.name, 
    sessionCookie.value, 
    sessionCookie.attributes
  );
}

