import mongoose from "mongoose";

export const RequestStatus = ['pending', 'onDelivery', 'delivered', 'rejected', 'accepted', 'completed'];
const RequestsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: String, required: true },
    status: {
        type: String,
        enum: RequestStatus, // Define allowed values for 'type'
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

// Export the model
const Requests = mongoose.models?.Requests || mongoose.model("Requests", RequestsSchema);

export default Requests;