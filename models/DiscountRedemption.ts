import mongoose from 'mongoose'

const discountRedemptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  discountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients', required: true },
  points: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.DiscountRedemption || mongoose.model('DiscountRedemption', discountRedemptionSchema) 