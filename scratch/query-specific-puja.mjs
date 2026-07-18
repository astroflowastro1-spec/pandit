import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const item = await Puja.findOne({ slug: "m-e-r-e-p-a-n-d-i-t-j-i-o-n-l-i-n-e-p-u-j-a-s-e-v-a" });
    console.log("PUJA DETAILS:");
    console.log(JSON.stringify(item, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}
check();
