import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Clients from "@/models/Clients";

// DELETE request to delete a client and associated requests
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await dbConnect();

    // Find the user
    const client = await Clients.findOne({ _id: id });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Delete the user
    await Clients.deleteOne({ _id: client._id });

    return NextResponse.json({ message: "Client deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
