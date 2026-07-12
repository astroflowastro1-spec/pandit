import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChadhava extends Document {
  title: string;
  slug: string;
  redSubtitle: string;
  description: string;
  location: string;
  date: string;
  imageSrc: string;
  sliderImage1Src?: string;
  sliderImage2Src?: string;
  badge?: string;
  badgeColor?: string;
  order: number;
  subtitle?: string;
  whyThisPuja?: string;
  aboutTemple?: string;
  templeImageSrc?: string;
  benefits?: string[];
  inclusions?: string[];
  packages?: any;
}

const ChadhavaSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  redSubtitle: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  imageSrc: { type: String, required: true },
  sliderImage1Src: { type: String, default: '' },
  sliderImage2Src: { type: String, default: '' },
  badge: { type: String, default: '' },
  badgeColor: { type: String, default: 'bg-[#F3912E]' },
  order: { type: Number, default: () => Date.now() },
  subtitle: { type: String, default: '' },
  whyThisPuja: { type: String, default: '' },
  aboutTemple: { type: String, default: '' },
  templeImageSrc: { type: String, default: '' },
  benefits: { type: [String], default: [] },
  inclusions: { type: [String], default: [] },
  packages: { type: Schema.Types.Mixed, default: null },
}, { timestamps: true });

if (mongoose.models.Chadhava) {
  delete mongoose.models.Chadhava;
}

export const Chadhava: Model<IChadhava> = mongoose.model<IChadhava>('Chadhava', ChadhavaSchema);
