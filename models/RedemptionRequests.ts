import { Schema, model, models } from 'mongoose'

const RedemptionRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  walletType: {
    type: String,
    required: true,
    enum: ['vodafone', 'instapay']
  },
  walletNumber: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})

const RedemptionRequest = models.RedemptionRequest || model('RedemptionRequest', RedemptionRequestSchema)

export default RedemptionRequest 