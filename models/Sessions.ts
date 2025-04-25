// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    _id: {
        type: String, // Use String as in your Prisma model
        required: true,
    },
    expires_at: {
        type: Number, // Store timestamp as integer
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
