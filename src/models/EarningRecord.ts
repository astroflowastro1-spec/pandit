import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEarningRecord extends Document {
  affiliateId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId | string; // Can be string if Booking is not populated fully
  amount: number;
  status: 'PENDING' | 'PAID' | 'REFUNDED';
  createdAt: Date;
  updatedAt: Date;
}

const EarningRecordSchema: Schema = new Schema({
  affiliateId: { type: Schema.Types.ObjectId, ref: 'Affiliate', required: true },
  bookingId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'PAID', 'REFUNDED'], default: 'PENDING' },
}, { timestamps: true });

if (mongoose.models.EarningRecord) {
  delete mongoose.models.EarningRecord;
}

export const EarningRecord: Model<IEarningRecord> = mongoose.model<IEarningRecord>('EarningRecord', EarningRecordSchema);
