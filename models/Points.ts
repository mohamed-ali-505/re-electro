import mongoose from "mongoose";

const PointsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    points: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model
const Points = mongoose.models?.Points || mongoose.model("Points", PointsSchema);

export default Points;