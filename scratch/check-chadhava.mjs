import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const ChadhavaSchema = new mongoose.Schema({}, { strict: false });
const Chadhava = mongoose.models.Chadhava || mongoose.model('Chadhava', ChadhavaSchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const items = await Chadhava.find({});
    console.log("CHADHAVAS IN DB:");
    items.forEach(c => {
      console.log(`- Title: ${c.title}`);
      console.log(`  Slug: ${c.slug}`);
      console.log(`  ImageSrc: ${c.imageSrc}`);
      console.log(`  SliderImage1Src: ${c.sliderImage1Src}`);
      console.log(`  SliderImage2Src: ${c.sliderImage2Src}`);
      console.log(`  TempleImageSrc: ${c.templeImageSrc}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}
check();
