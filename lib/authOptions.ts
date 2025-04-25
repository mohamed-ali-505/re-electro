import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";


export const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // Session duration: 30 days (1 month)
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await Users.findOne({ email: credentials.email });

                if (!user) {
                    // return { email: credentials?.email, error: 'No user found!' };
                    throw new Error(JSON.stringify({ email: "No user found!" }));
                }

                if (user.password !== credentials?.password) {
                    throw new Error(JSON.stringify({ password: "Password is incorrect!" }));
                }

                if (user.isActive === false) {
                    throw new Error(JSON.stringify({ isActive: "Account is not active!" }));
                }

                if (user.role === "guest") {
                    throw new Error(JSON.stringify({ notAllow: "You are not authorized to access this application" }));
                }

                return {
                    id: user._id.toString(), // Adding id
                    email: user.email,
                    name: user.name,
                    role: user.role, // Adding role
                    active: user.isActive, // Example: user's account status
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            const userExists = await Users.findOne({ email: token.email });

            if (!userExists) {
                // If user doesn't exist, mark the token as invalid
                token.isValid = false;
                return token;
            }

            // if (!userExists.isActive) {
            //     // If user is inactive, mark the token as invalid
            //     token.isValid = false;
            //     return token;
            // }
            if (userExists) {
                token.isValid = true;
                token.userId = userExists.id;
                token.email = userExists.email;
                token.name = userExists.name;
                token.role = userExists.role;
            }
            return token;
        },
        async session({ session, token }) {

            if (token.isValid === false) {
                return {
                    user: undefined,
                    expires: "",
                }; // Signals the session is no longer valid
            }

            if (token) {
                session.user = {
                    role: token.role as "admin" | "user" | "superAdmin",
                    email: token.email,
                    name: token.name,
                    userId: token.userId as string,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
};
