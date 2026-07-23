import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

const ChadhavaSchema = new mongoose.Schema({}, { strict: false });
const Chadhava = mongoose.models.Chadhava || mongoose.model('Chadhava', ChadhavaSchema);

// Helper function to process packages
const processPackages = (packages) => {
  if (!packages) return packages;
  return packages.map(pkg => {
    // Remove Prasad-related features
    const updatedFeatures = pkg.features.filter(f => !f.includes('Dry Fruits') && !f.includes('Aashirwad Box'));
    
    // Remove Prasad-related descriptions
    let updatedDescription = pkg.description;
    if (updatedDescription) {
      if (updatedDescription.includes('Premium Aashirwad Box sent to your home.')) {
        updatedDescription = updatedDescription.replace(' Premium Aashirwad Box sent to your home.', '');
      }
      if (updatedDescription.includes('Ultimate Aashirwad Box sent.')) {
        updatedDescription = updatedDescription.replace(' Ultimate Aashirwad Box sent.', '');
      }
      if (updatedDescription.includes('Energized sacred items (Aashirwad Box) will be shipped')) {
        updatedDescription = updatedDescription.replace('Energized sacred items (Aashirwad Box) will be shipped directly to your home.', '');
      }
    }

    return {
      ...pkg,
      features: updatedFeatures,
      description: updatedDescription
    };
  });
};

async function removeAllPrasad() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // 1. Process all Pujas
    const pujas = await Puja.find({});
    console.log(`\nFound ${pujas.length} Pujas. Updating...`);
    
    let pujasUpdated = 0;
    for (const puja of pujas) {
      if (puja.packages) {
        const updatedPackages = {
          india: processPackages(puja.packages?.india),
          nri: processPackages(puja.packages?.nri)
        };
        await Puja.findByIdAndUpdate(puja._id, { $set: { packages: updatedPackages } });
        pujasUpdated++;
      }
    }
    console.log(`✅ Updated ${pujasUpdated} Pujas.`);

    // 2. Process all Chadhavas
    const chadhavas = await Chadhava.find({});
    console.log(`\nFound ${chadhavas.length} Chadhavas. Updating...`);
    
    let chadhavasUpdated = 0;
    for (const chadhava of chadhavas) {
      if (chadhava.packages) {
        const updatedPackages = {
          india: processPackages(chadhava.packages?.india),
          nri: processPackages(chadhava.packages?.nri)
        };
        await Chadhava.findByIdAndUpdate(chadhava._id, { $set: { packages: updatedPackages } });
        chadhavasUpdated++;
      }
    }
    console.log(`✅ Updated ${chadhavasUpdated} Chadhavas.`);

    console.log('\n🎉 Successfully removed Prasad and Aashirwad Box items from all Pujas and Chadhavas!');
    
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

removeAllPrasad();
