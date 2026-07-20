import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

// NRI packages with INR-based prices (will be converted to local currency on frontend)
const nriPackages = [
  {
    id: 'individual',
    title: 'Individual Puja',
    price: 501,
    description: 'Puja will be performed with your Name and Gotra. Video recording of Sankalp & Havan will be shared.',
    features: [
      'Sankalp with 1 Name & Gotra',
      'Puja Video Clip via WhatsApp',
      'Dry Fruits (100g) + Deity Photo'
    ],
    tag: 'Popular',
    tagColor: 'bg-blue-600'
  },
  {
    id: 'couple',
    title: 'Partner Puja',
    price: 1100,
    description: 'Puja performed for Husband and Wife. Detailed Sankalp with both names. Premium Aashirwad Box sent to your home.',
    features: [
      'Sankalp with 2 Names & Gotra',
      'Full Puja Video Clip via WhatsApp',
      'Aashirwad Box (Kalava, Sindoor, Deity Photo)'
    ],
    tag: 'Best Value',
    tagColor: 'bg-[#FF7F3F]'
  },
  {
    id: 'family',
    title: 'Family Puja (Up to 4 Members)',
    price: 2100,
    description: 'Special Havan performed for health, wealth & protection of the entire family. Ultimate Aashirwad Box sent.',
    features: [
      'Maha Sankalp with up to 4 Names & Gotras',
      'Detailed Video & Live Sankalp Photo',
      'Aashirwad Box (Energized Yantra, Kalava, Janeu, Diya)'
    ],
    tag: 'Recommended',
    tagColor: 'bg-emerald-600'
  }
];

async function updateNriPrices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const puja = await Puja.findOne({ slug: 'gupt-navratri-maa-jwala-ji-pooja' });
    
    if (!puja) {
      console.log('❌ Puja not found! Listing all pujas...');
      const all = await Puja.find({}, { slug: 1, title: 1 });
      all.forEach(p => console.log(`  - ${p.slug} | ${p.title}`));
      process.exit(1);
    }

    console.log(`✅ Found: "${puja.title}"`);
    console.log('Old NRI prices:', puja.packages?.nri?.map(p => `${p.title}: ${p.price}`)?.join(', ') || 'none');

    await Puja.findByIdAndUpdate(puja._id, {
      $set: { 'packages.nri': nriPackages }
    });

    console.log('\n✅ NRI prices updated!');
    console.log('  Individual: ₹501');
    console.log('  Partner:    ₹1100');
    console.log('  Family:     ₹2100');
    console.log('\nThese will convert to local currency for abroad users automatically.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

updateNriPrices();
