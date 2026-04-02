import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/webadmin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Allow general access to middleware, we'll protect specific routes
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: { strategy: "jwt" },
  trustHost: true,
} satisfies NextAuthConfig;
