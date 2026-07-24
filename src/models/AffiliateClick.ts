import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAffiliateClick extends Document {
  affiliateCode: string;
  pujaSlug?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const AffiliateClickSchema: Schema = new Schema({
  affiliateCode: { type: String, required: true },
  pujaSlug: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

if (mongoose.models.AffiliateClick) {
  delete mongoose.models.AffiliateClick;
}

export const AffiliateClick: Model<IAffiliateClick> = mongoose.model<IAffiliateClick>('AffiliateClick', AffiliateClickSchema);
