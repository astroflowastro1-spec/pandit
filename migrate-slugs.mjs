import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const PujaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
}, { strict: false });

const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    
    const pujas = await Puja.find({});
    console.log(`Found ${pujas.length} pujas. Migrating slugs...`);
    
    for (const puja of pujas) {
      if (!puja.slug) {
        puja.slug = generateSlug(puja.title);
        await puja.save();
        console.log(`Updated slug for: ${puja.title} -> ${puja.slug}`);
      }
    }
    console.log("Migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
