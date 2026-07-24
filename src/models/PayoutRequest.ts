import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayoutRequest extends Document {
  affiliateId: mongoose.Types.ObjectId;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  adminNotes?: string;
  createdAt: Date;
  processedAt?: Date;
}

const PayoutRequestSchema: Schema = new Schema({
  affiliateId: { type: Schema.Types.ObjectId, ref: 'Affiliate', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  adminNotes: { type: String },
  processedAt: { type: Date }
}, { timestamps: true });

if (mongoose.models.PayoutRequest) {
  delete mongoose.models.PayoutRequest;
}

export const PayoutRequest: Model<IPayoutRequest> = mongoose.model<IPayoutRequest>('PayoutRequest', PayoutRequestSchema);
