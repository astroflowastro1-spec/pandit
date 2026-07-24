import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

const PujaSchema = new mongoose.Schema({}, { strict: false });
const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

const pujasToSeed = [
  {
    title: "Gupt Navratri Maa Jwala ji Pooja",
    slug: "gupt-navratri-maa-jwala-ji-pooja",
    redSubtitle: "GUPT NAVRATRI MAA JWALA JI POOJA",
    description: "Seek blessings from Maa Jwala ji during Gupt Navratri for spiritual growth, prosperity, and fulfillment of desires.",
    location: "Jawala Ji Temple, Himachal Pradesh",
    date: "21 July 2026, Tuesday",
    imageSrc: "/Gupt Navratri  Maa Jwala ji Pooja.jpeg",
    badge: "",
    badgeColor: "bg-[#F3912E]",
    isActive: true,
  },
  {
    title: "Gupt Navratri Maa Chhinmastika Pooja",
    slug: "gupt-navratri-maa-chhinmastika-pooja",
    redSubtitle: "GUPT NAVRATRI MAA CHHINMASTIKA POOJA",
    description: "Blessings from Maa Chhinmastika for Victory over Enemies, success in life, and removal of obstacles",
    location: "Jawala Ji Temple, Himachal Pradesh",
    date: "22 July 2026, Wednesday",
    imageSrc: "/Gupt Navratri  Maa Chhinmastika Pooja.jpeg",
    badge: "",
    badgeColor: "bg-[#F3912E]",
    isActive: true,
  },
  {
    title: "Gupt Navratri Maa Banglamukhi Laal Mirchi Havan",
    slug: "gupt-navratri-maa-banglamukhi-laal-mirchi-havan",
    redSubtitle: "GUPT NAVRATRI MAA BANGLAMUKHI LAAL MIRCHI HAVAN",
    description: "Blessings from Maa Banglamukhi for victory over enemies, success in legal matters, and removal of obstacles.",
    location: "Maa Banglamukhi Shidhpeedh Naalkheda",
    date: "23 July 2026, Thursday",
    imageSrc: "/Gupt Navratri Maa Banglamukhi Laal Mirchi Havan.jpeg",
    badge: "",
    badgeColor: "bg-[#D97706]",
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    for (const data of pujasToSeed) {
      const existing = await Puja.findOne({ slug: data.slug });
      if (!existing) {
        await Puja.create(data);
        console.log(`Created: ${data.slug}`);
      } else {
        console.log(`Already exists: ${data.slug}`);
      }
    }
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
