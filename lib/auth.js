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
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId.toString(), {});
  const sessionCookie = await lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}

export async function isAuthenticated() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const cookieValue = sessionCookie.value; // session id

  if (!cookieValue) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(cookieValue);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createBlankSessionCookie(result.session.id);

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}

  return result;
}

export async function destroyAuthSession() {
  const { session } = await isAuthenticated();
  
  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
    );
}