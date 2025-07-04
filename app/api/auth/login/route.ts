// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        await dbConnect();

        const user = await Users.findOne({ email });

        if (!user) {
            return NextResponse.json({
                email: "Invalid credentials",
                error: "No user found!",
            }, { status: 401 });
        }

        if (user.password !== password) {
            return NextResponse.json({
                password: "Invalid credentials",
                error: "No user found!",
            }, { status: 401 });
        }

        if (user.isActive === false) {
            return NextResponse.json({
                error: "Account is not active",
                isActive: "Account is not active",
            }, { status: 401 });
        }

        if (user.role === "guest") {
            return NextResponse.json({
                error: "You are not authorized to access this application",
                notAllow: "You are not authorized to access this application",
            }, { status: 401 });
        }

        if (user.isVerified === false) {
            return NextResponse.json({
                error: "Email is not verified",
                notVerified: "Email is not verified",
            }, { status: 401 });
        }

        const cookieStore = cookies();
        cookieStore.set('role', user.role);
        cookieStore.set('id', user._id.toString());

        return NextResponse.json({
            message: "Login successful",
            data: {
                id: user._id,
                role: user.role,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
