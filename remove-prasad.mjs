import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function removePrasad() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the Shani dev pooja
    const puja = await Puja.findOne({ title: { $regex: /shani/i } });
    
    if (!puja) {
      console.log('❌ Shani Dev Puja not found! Listing all pujas:');
      const all = await Puja.find({}, { slug: 1, title: 1 });
      all.forEach(p => console.log(`  - ${p.slug} | ${p.title}`));
      process.exit(1);
    }

    console.log(`✅ Found: "${puja.title}"`);
    
    // Helper function to process packages
    const processPackages = (packages) => {
      if (!packages) return packages;
      return packages.map(pkg => {
        // Remove Prasad-related features
        const updatedFeatures = pkg.features.filter(f => !f.includes('Dry Fruits') && !f.includes('Aashirwad Box'));
        
        // Remove Prasad-related descriptions
        let updatedDescription = pkg.description;
        if (updatedDescription.includes('Premium Aashirwad Box sent to your home.')) {
          updatedDescription = updatedDescription.replace(' Premium Aashirwad Box sent to your home.', '');
        }
        if (updatedDescription.includes('Ultimate Aashirwad Box sent.')) {
          updatedDescription = updatedDescription.replace(' Ultimate Aashirwad Box sent.', '');
        }
        if (updatedDescription.includes('Energized sacred items (Aashirwad Box) will be shipped')) {
          updatedDescription = updatedDescription.replace('Energized sacred items (Aashirwad Box) will be shipped directly to your home.', '');
        }

        return {
          ...pkg,
          features: updatedFeatures,
          description: updatedDescription
        };
      });
    };

    const updatedPackages = {
      india: processPackages(puja.packages?.india),
      nri: processPackages(puja.packages?.nri)
    };

    await Puja.findByIdAndUpdate(puja._id, {
      $set: { packages: updatedPackages }
    });

    console.log('\n✅ Prasad options removed successfully!');
    console.log('Updated India Packages:');
    console.log(JSON.stringify(updatedPackages.india, null, 2));
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

removePrasad();
