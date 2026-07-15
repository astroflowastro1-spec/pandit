import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Manually load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) {
    process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
  }
});

async function testAiSensy() {
  const url = process.env.AISENSY_API_URL;
  const apiKey = process.env.AISENSY_API_KEY;
  const campaignName = process.env.AISENSY_CAMPAIGN_NAME;

  console.log("URL:", url);
  console.log("Campaign:", campaignName);
  // Do not print full api key
  console.log("API Key exists:", !!apiKey);

  const payload = {
    apiKey: apiKey,
    campaignName: campaignName,
    destination: "917018610136", // Test number
    userName: "Digital Disha Astro Spiritual LLP",
    templateParams: [
      "Test User",
      "Test Puja"
    ],
    source: "website checkout",
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("SUCCESS! Response Data:");
    console.log(response.data);
  } catch (error) {
    console.error("FAILED!");
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

testAiSensy();
