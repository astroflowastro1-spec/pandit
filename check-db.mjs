import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const pujas = await Puja.find({});
    console.log("PUJAS IN DB:");
    pujas.forEach(p => {
      console.log(`- Title: ${p.title} | Slug: ${p.slug}`);
      if (p.packages) {
         console.log(`  Packages: India Ind: ${p.packages.india?.[0]?.price} | NRI Ind: ${p.packages.nri?.[0]?.price}`);
      } else {
         console.log(`  No packages found!`);
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}
check();
