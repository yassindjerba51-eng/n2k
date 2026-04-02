import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";

const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("Authorize called with:", credentials?.email);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("Searching user for:", email);
          const user = await prisma.user.findUnique({ where: { email } });
          
          if (!user || !user.password) {
            console.log("User not found or no password hash");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("Password match result:", passwordsMatch);
          
          if (passwordsMatch) return user;
        } else {
          console.log("Zod validation failed:", parsedCredentials.error.format());
        }

        console.log("Invalid credentials final fallthrough");
        return null;
      },
    }),
  ],
});
