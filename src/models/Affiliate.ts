import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAffiliate extends Document {
  name: string;
  email: string;
  phone: string;
  password?: string;
  affiliateCode: string;
  status: 'Active' | 'Inactive';
  commissionConfig: {
    commissionType: 'PERCENTAGE' | 'FIXED';
    value: number;
    scope: 'GLOBAL' | 'PRODUCT_SPECIFIC';
  };
  walletBalance: number;
  payoutDetails?: {
    payoutType: 'BANK' | 'UPI';
    upiId?: string;
    accountNumber?: string;
    ifsc?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AffiliateSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String }, // Can be set if we want to allow login later
  affiliateCode: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  commissionConfig: {
    commissionType: { type: String, enum: ['PERCENTAGE', 'FIXED'], default: 'PERCENTAGE' },
    value: { type: Number, default: 10 },
    scope: { type: String, enum: ['GLOBAL', 'PRODUCT_SPECIFIC'], default: 'GLOBAL' },
  },
  walletBalance: { type: Number, default: 0 },
  payoutDetails: {
    payoutType: { type: String, enum: ['BANK', 'UPI'] },
    upiId: { type: String },
    accountNumber: { type: String },
    ifsc: { type: String },
  }
}, { timestamps: true });

if (mongoose.models.Affiliate) {
  delete mongoose.models.Affiliate;
}

export const Affiliate: Model<IAffiliate> = mongoose.model<IAffiliate>('Affiliate', AffiliateSchema);
