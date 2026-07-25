import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const db = mongoose.connection.db;
  const chadhavaItems = await db.collection('chadhavas').find({}).toArray();
  
  console.log('Chadhava Items Count:', chadhavaItems.length);
  chadhavaItems.forEach(item => {
    console.log(`- ${item.title}: ${item.imageSrc}`);
  });
  
  mongoose.disconnect();
}

check().catch(console.error);
