import mongoose from "mongoose";

export const ROLE = ["admin", "user", "guest"];
const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    points: { type: Number, required: true },
    role: {
        type: String,
        enum: ROLE, // Define allowed values for 'type'
        required: true,
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model
const Users = mongoose.models?.Users || mongoose.model("Users", UsersSchema);

export default Users;