import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Requests, { RequestStatus } from "@/models/Requests";
import Users from "@/models/Users";

// POST request to create or update a request
export async function POST(request: Request) {
    try {
        const { name, email, phone, address, items, status, id, newPoints } = await request.json();

        const newPointsNumber = parseInt(newPoints);

        await dbConnect();
        let savedRequest;

        const user = await Users.findOne({ $or: [{ email: email }, { phone: phone }] });

        if (id) {
            if (!RequestStatus.includes(status)) {
                return NextResponse.json({ error: "Invalid status" }, { status: 400 });
            }

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            if (newPointsNumber < 0) {
                return NextResponse.json({ error: "Invalid points" }, { status: 400 });
            }

            if (status === "completed" && newPointsNumber) {

                // Update points
                await Users.findOneAndUpdate({ _id: user._id }, { points: user.points + newPointsNumber });
            }

            savedRequest = await Requests.findByIdAndUpdate(
                id,
                { status: status || "pending" },
                { new: true }
            );

            if (!savedRequest) {
                return NextResponse.json({ error: "Request not found" }, { status: 404 });
            }
        } else {
            if (!name || !email || !phone || !address || !items) {
                return NextResponse.json({ error: "All fields are required" }, { status: 400 });
            }


            if (!user) {
                console.log("user not found");

                const newUser = new Users({
                    name,
                    email,
                    phone,
                    role: "guest",
                    password: "guest",
                    points: 0,
                });
                await newUser.save();
            }

            const newRequest = new Requests({
                name,
                email,
                phone,
                address,
                items,
                status: status || "pending",
            });

            savedRequest = await newRequest.save();
        }

        return NextResponse.json(savedRequest, { status: id ? 200 : 201 });
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
