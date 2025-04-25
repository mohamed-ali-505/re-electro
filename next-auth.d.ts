import { type DefaultSession } from "next-auth";
import { ROLE } from "@/models/Users";

export type ExtendedUser = DefaultSession["user"] & {
  role: ROLE | null;
  userId: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}