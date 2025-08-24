import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./db";

export interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
  role?: string;
}

export interface Isession {
  user: IUser;
}

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: [
            "manishguptacpn@gmail.com",
            "pratyushsingha83@gmail.com",
          ].includes(profile.email ?? "")
            ? "admin"
            : "user",
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role:
            profile.email === "pratyushsingha83@gmail.com" ? "admin" : "user",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user && user.id && user.email) {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            name: user.name,
            email: user.email,
            role: "admin",
          },
          create: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: "admin",
          },
        });
      }
      return true; 
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;

      console.log("user", user);

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
