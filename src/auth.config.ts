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
    jwt({ token, user }) {
      // On sign-in, persist the user id onto the token (JWT strategy)
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // Expose the user id on the session for API route authorization
      if (session.user) {
        session.user.id = (token.id || token.sub) as string;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
  session: { strategy: "jwt" },
  trustHost: true,
} satisfies NextAuthConfig;
