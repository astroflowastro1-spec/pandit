import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
  paymentId: string;
  orderId: string;
  pujaTitle: string;
  pujaDate: string;
  pujaLocation: string;
  packageId: string;
  packageTitle: string;
  packagePrice: number;
  currency: string;
  currencyCode: string;
  customerName: string;
  customerPhone: string;
  customerGotra: string;
  member2Name?: string;
  member3Name?: string;
  member4Name?: string;
  totalPaid: number;
  date: string;
  whatsappSent: boolean;
}

const BookingSchema: Schema = new Schema({
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  pujaTitle: { type: String, required: true },
  pujaDate: { type: String, required: true },
  pujaLocation: { type: String, required: true },
  packageId: { type: String, required: true },
  packageTitle: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  currency: { type: String, required: true },
  currencyCode: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerGotra: { type: String, default: 'Not specified' },
  member2Name: { type: String },
  member3Name: { type: String },
  member4Name: { type: String },
  totalPaid: { type: Number, required: true },
  date: { type: String, required: true },
  whatsappSent: { type: Boolean, default: false },
}, { timestamps: true });

if (mongoose.models.Booking) {
  delete mongoose.models.Booking;
}

export const Booking: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);
