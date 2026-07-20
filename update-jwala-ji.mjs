import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://astroflowastro1:cxCeULJtr0yacjdb@cluster0.dpjjsr8.mongodb.net/?appName=Cluster0";

// Define a schema with strict: false so we can save any additional fields
const PujaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  redSubtitle: { type: String },
  subtitle: { type: String },
  description: { type: String },
  location: { type: String },
  date: { type: String },
  badge: { type: String },
  badgeColor: { type: String },
  whyThisPuja: { type: String },
  aboutTemple: { type: String },
  benefits: { type: [String] },
  inclusions: { type: [String] },
  packages: { type: mongoose.Schema.Types.Mixed },
}, { strict: false });

const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const slug = "gupt-navratri-maa-jwala-ji-pooja";
    let puja = await Puja.findOne({ slug });

    if (!puja) {
      // Find by title or something similar
      puja = await Puja.findOne({ title: /Jwala/i });
    }

    if (!puja) {
      console.log("Puja not found. Creating a new one...");
      puja = new Puja({
        title: "Gupt Navratri Maa Jwala ji Pooja",
        slug: slug,
        imageSrc: "/Gupt Navratri  Maa Jwala ji Pooja.jpeg",
      });
    }

    puja.title = "Gupt Navratri Maa Jwala ji Pooja";
    puja.slug = slug;
    puja.redSubtitle = "M E R E  P A N D I T  J I  ·  O N L I N E  P U J A  S E V A";
    puja.subtitle = "Offer prayers to the Goddess who manifests not as an idol, but as an eternal flame.";
    puja.date = "21 July 2026, Tuesday";
    puja.location = "Jwala Ji Temple, Kangra, Himachal Pradesh";
    
    puja.whyThisPuja = "Jwala Ji is one of the 51 Shaktipeethas, marking the spot where, according to legend, Sati's tongue fell to earth. What makes this shrine extraordinary is that there is no idol to worship at all — nine natural flames, fed by underground gas seepage and said to have burned continuously for centuries, are worshipped directly as manifestations of the Goddess in nine forms, including Mahakali, Mahalakshmi and Saraswati.";
    
    puja.aboutTemple = "Tradition credits Raja Bhumi Chand Katoch of Kangra with discovering the site after a divine dream and building the first temple here. The shrine's enduring power is illustrated by the well-known legend of Emperor Akbar, who reportedly tried to extinguish the flame using an iron disc and diverted water, only for it to keep burning; humbled, he is said to have offered a golden chattar to the Goddess. The temple's present golden dome and silver doors were later gifted by Sikh rulers Maharaja Ranjit Singh and his son Kharak Singh.";

    puja.benefits = [
      "Destruction of negative influences and enemy effects",
      "Spiritual strength and inner awakening",
      "Fulfilment of sincere desires and prayers",
      "Protection, courage and renewed confidence",
      "Blessings believed to reach even from a distance, in one's name"
    ];

    puja.inclusions = [
      "Sankalp performed with your name and gotra",
      "Puja and offering performed before the sacred flame",
      "Puja video shared on WhatsApp",
      "Blessed items box delivered to your address"
    ];

    puja.packages = {
      india: [
        {
          id: "ind_in",
          title: "Individual Puja",
          price: 251,
          originalPrice: 499,
          description: "Sankalp will be performed with 1 Name and Gotra before the eternal sacred flame of Maa Jwala Ji.",
          features: [
            "Sankalp with 1 Name & Gotra",
            "Offering before the Sacred Flame",
            "Puja video shared on WhatsApp",
            "Blessed items delivered to your home"
          ]
        },
        {
          id: "cpl_in",
          title: "Couple Puja",
          price: 501,
          originalPrice: 999,
          description: "Sankalp will be performed for Couple (2 Names & Gotra) before the eternal sacred flame.",
          features: [
            "Sankalp with 2 Names & Gotra",
            "Offering before the Sacred Flame",
            "Puja video shared on WhatsApp",
            "Blessed items delivered to your home"
          ]
        },
        {
          id: "fam_in",
          title: "Family Puja",
          price: 1100,
          originalPrice: 1999,
          description: "Sankalp will be performed for the entire family (up to 4 members) for protection and blessings.",
          features: [
            "Sankalp with up to 4 Names & Gotras",
            "Offering before the Sacred Flame",
            "Full Puja video shared on WhatsApp",
            "Special Aashirwad Box delivered to your home"
          ]
        }
      ],
      nri: [
        {
          id: "ind_nri",
          title: "Individual Puja (NRI / Abroad)",
          price: 501,
          originalPrice: 999,
          description: "Sankalp will be performed with 1 Name and Gotra from abroad before the eternal flame.",
          features: [
            "Sankalp with 1 Name & Gotra",
            "Offering before the Sacred Flame",
            "Puja video shared on WhatsApp",
            "Digital Aashirwad updates"
          ]
        },
        {
          id: "cpl_nri",
          title: "Couple Puja (NRI / Abroad)",
          price: 1100,
          originalPrice: 1999,
          description: "Sankalp will be performed for Couple (2 Names & Gotra) from abroad before the eternal flame.",
          features: [
            "Sankalp with 2 Names & Gotra",
            "Offering before the Sacred Flame",
            "Puja video shared on WhatsApp",
            "Digital Aashirwad updates"
          ]
        },
        {
          id: "fam_nri",
          title: "Family Puja (NRI / Abroad)",
          price: 2100,
          originalPrice: 3999,
          description: "Sankalp will be performed for the entire family (up to 4 members) from abroad for protection.",
          features: [
            "Sankalp with up to 4 Names & Gotras",
            "Offering before the Sacred Flame",
            "Full Puja video shared on WhatsApp",
            "Digital Aashirwad updates"
          ]
        }
      ]
    };

    // Keep description the same or set it to whyThisPuja
    puja.description = puja.whyThisPuja;

    await puja.save();
    console.log("Puja updated successfully:", puja.title);

  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
