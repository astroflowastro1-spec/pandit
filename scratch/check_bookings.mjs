import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const BookingSchema = new mongoose.Schema({}, { strict: false });
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const bookings = await Booking.find({});
    console.log("BOOKINGS IN DB:");
    bookings.forEach(b => {
      console.log(`- Customer: ${b.customerName} | Phone: ${b.customerPhone} | Gotra: ${b.customerGotra} | Paid: ${b.totalPaid} | Puja: ${b.pujaTitle}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}
check();
