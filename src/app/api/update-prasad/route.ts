import { NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }
    
    // Create models if they don't exist
    const PujaSchema = new mongoose.Schema({}, { strict: false });
    const Puja = mongoose.models.Puja || mongoose.model('Puja', PujaSchema);
    
    const ChadhavaSchema = new mongoose.Schema({}, { strict: false });
    const Chadhava = mongoose.models.Chadhava || mongoose.model('Chadhava', ChadhavaSchema);
    
    let updatedCount = 0;
    let errors = [];
    
    // Helper function to update packages array
    const updatePackages = (packages) => {
      let changed = false;
      if (!packages) return { changed, packages };
      
      const newPackages = JSON.parse(JSON.stringify(packages));
      
      const cleanString = (str) => {
        if (!str || typeof str !== 'string') return str;
        let newStr = str;
        // Case-insensitive replace for prasad/parsad
        newStr = newStr.replace(/Prasad/gi, "");
        newStr = newStr.replace(/parsad/gi, "");
        
        // Clean up empty parentheses and double spaces
        newStr = newStr.replace(/\(\s*,\s*/g, "(");
        newStr = newStr.replace(/,\s*\)/g, ")");
        newStr = newStr.replace(/\(\s*\)/g, "");
        newStr = newStr.replace(/  +/g, " ").trim();
        
        if (newStr !== str) changed = true;
        return newStr;
      };
      
      // Handle both array format and { india: [], nri: [] } format
      const processArray = (arr) => {
        if (!Array.isArray(arr)) return;
        for (let pkg of arr) {
          if (pkg.features && Array.isArray(pkg.features)) {
            pkg.features = pkg.features.map(cleanString);
          }
          if (pkg.description) {
            pkg.description = cleanString(pkg.description);
          }
        }
      };
      
      if (Array.isArray(newPackages)) {
        processArray(newPackages);
      } else {
        if (newPackages.india) processArray(newPackages.india);
        if (newPackages.nri) processArray(newPackages.nri);
      }
      
      return { changed, packages: newPackages };
    };

    // Update Pujas
    const pujas = await Puja.find({});
    for (let puja of pujas) {
      let pujaChanged = false;
      let obj = puja.toObject();
      
      if (obj.packages) {
        const { changed, packages } = updatePackages(obj.packages);
        if (changed) {
          puja.packages = packages;
          pujaChanged = true;
        }
      }
      
      if (obj.inclusions && Array.isArray(obj.inclusions)) {
        const newInclusions = obj.inclusions.map(inc => {
          let newInc = inc.replace(/Prasad/gi, "Blessed items");
          newInc = newInc.replace(/parsad/gi, "Blessed items");
          if (newInc !== inc) pujaChanged = true;
          return newInc;
        });
        if (pujaChanged) puja.inclusions = newInclusions;
      }
      
      if (pujaChanged) {
        await Puja.findByIdAndUpdate(puja._id, { $set: { packages: puja.packages, inclusions: puja.inclusions } });
        updatedCount++;
      }
    }
    
    // Update Chadhavas
    const chadhavas = await Chadhava.find({});
    for (let ch of chadhavas) {
      let chChanged = false;
      let obj = ch.toObject();
      
      if (obj.packages) {
        const { changed, packages } = updatePackages(obj.packages);
        if (changed) {
          ch.packages = packages;
          chChanged = true;
        }
      }
      
      if (obj.inclusions && Array.isArray(obj.inclusions)) {
        const newInclusions = obj.inclusions.map(inc => {
          let newInc = inc.replace(/Prasad/gi, "Blessed items");
          newInc = newInc.replace(/parsad/gi, "Blessed items");
          if (newInc !== inc) chChanged = true;
          return newInc;
        });
        if (chChanged) ch.inclusions = newInclusions;
      }
      
      if (chChanged) {
        await Chadhava.findByIdAndUpdate(ch._id, { $set: { packages: ch.packages, inclusions: ch.inclusions } });
        updatedCount++;
      }
    }

    return NextResponse.json({ success: true, updatedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
