import mongoose from "mongoose";

export const clientsTypes = ['doctor', 'lab', 'teacher', 'lawyer'];
const ClientsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    pointsRequired: { type: Number, required: true },
    type: {
        type: String,
        enum: clientsTypes, // Define allowed values for 'type'
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model
const Clients = mongoose.models?.Clients || mongoose.model("Clients", ClientsSchema);

export default Clients;