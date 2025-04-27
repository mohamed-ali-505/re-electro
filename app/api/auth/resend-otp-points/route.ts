import dbConnect from "@/lib/dbConnect";
import { sendOTPEmail } from "@/lib/mail";
import Users from "@/models/Users";


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export async function POST(req: Request) {
  await dbConnect();

  const { email } = await req.json();

  console.log(email);
  const user = await Users.findOne({ email });

  console.log(user);
  

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 1000 * 60 * 10); // 10 min

  user.otpPoint = otp;
  user.otpPointExpiry = otpExpiry;
  await user.save();

  await sendOTPEmail(user.email, otp);

  return new Response("OTP re-sent successfully");
}
