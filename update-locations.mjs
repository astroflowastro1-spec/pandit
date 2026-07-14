import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^"|"$/g, '');
  process.env[key] = val;
});

const MONGODB_URI = process.env.MONGODB_URI;

const updates = [
  {
    titleMatch: /chhinmastika|chintapurni|chintpurni/i,
    newLocation: 'Shaktipeeth Shri Mata Chintpurni ji Temple, Una, Himachal Pradesh'
  },
  {
    titleMatch: /jawala|jwala|jwalamukhi/i,
    newLocation: 'Shri Jwalamukhi Mata Shaktipeeth Temple, Kangra, Himachal Pradesh'
  },
  {
    titleMatch: /banglamukhi|baglamukhi/i,
    newLocation: 'Shri Baglamukhi Mata Siddhpeeth Temple, Nalkheda, Madhya Pradesh'
  }
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const db = mongoose.connection.db;
  const collection = db.collection('pujas');

  const allPujas = await collection.find({}, { projection: { _id: 1, title: 1, slug: 1, location: 1 } }).toArray();
  console.log(`\n📋 Found ${allPujas.length} pujas:\n`);
  allPujas.forEach(p => console.log(`  • ${p.title} → "${p.location}"`));

  console.log('\n🔄 Updating locations...\n');

  for (const update of updates) {
    const matched = allPujas.filter(p => update.titleMatch.test(p.title) || update.titleMatch.test(p.slug || ''));
    
    if (matched.length === 0) {
      console.log(`⚠️  No puja matched: ${update.titleMatch}`);
      continue;
    }

    for (const puja of matched) {
      const result = await collection.updateOne(
        { _id: puja._id },
        { $set: { location: update.newLocation } }
      );
      console.log(`✅ Updated "${puja.title}"`);
      console.log(`   Old: "${puja.location}"`);
      console.log(`   New: "${update.newLocation}"\n`);
    }
  }

  console.log('✅ All done!');
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
