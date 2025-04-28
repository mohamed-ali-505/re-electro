import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";

export async function POST(req: Request) {
    await dbConnect();

    const { email, otp } = await req.json();

    // Find user by email
    const user = await Users.findOne({ email });
    console.log(user);
    

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    console.log(user.otpPoint);
    console.log(user.otpPointExpiry);

    console.log(user.otpPoint !== otp);
    console.log(user.otpPointExpiry.getTime() < Date.now());
    
    
    
    // Check OTP and expiry
    if (user.otpPoint !== otp || (user.otpPointExpiry.getTime() < Date.now())) {
        return new Response("Invalid or expired OTP", { status: 400 });
    }

    user.otpPoint = "";
    user.otpPointExpiry = null;

    await user.save();

    return new Response("Email verified successfully");
}
