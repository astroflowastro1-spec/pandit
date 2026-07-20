// @ts-nocheck
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    
    // Create models if they don't exist
    const PujaSchema = new mongoose.Schema({}, { strict: false });
    const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);
    
    const pujas = await Puja.find({});
    
    let allFeatures = [];
    for (let puja of pujas) {
      let obj = puja.toObject();
      if (obj.packages) {
         if (Array.isArray(obj.packages)) {
           obj.packages.forEach(p => {
             if (p.features) allFeatures.push(...p.features);
           });
         } else {
           if (obj.packages.india) {
             obj.packages.india.forEach(p => {
               if (p.features) allFeatures.push(...p.features);
             });
           }
         }
      }
    }
    
    const prasadFeatures = allFeatures.filter(f => typeof f === 'string' && f.toLowerCase().includes('prasad'));

    return NextResponse.json({ success: true, count: pujas.length, prasadFeatures });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
