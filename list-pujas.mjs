import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    const pujas = await Puja.find({});
    console.log("Pujas in database:");
    pujas.forEach(p => {
      console.log(`- Title: "${p.title}"`);
      console.log(`  Slug: "${p.slug}"`);
      console.log(`  ID: "${p._id}"`);
      console.log(`  Subtitle: "${p.subtitle}"`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
