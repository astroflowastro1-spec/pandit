import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

mongoose.connect(process.env.MONGODB_URI);

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function check() {
  const pujas = await Puja.find({});
  for (const puja of pujas) {
    console.log(`\nPuja: ${puja.title}`);
    console.log(`Packages defined? ${!!puja.packages}`);
    if (puja.packages) {
       console.log('India Individual Price:', puja.packages?.india?.[0]?.price);
       console.log('NRI Individual Price:', puja.packages?.nri?.[0]?.price);
    }
  }
  mongoose.disconnect();
}
check();
