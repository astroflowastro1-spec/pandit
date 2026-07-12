import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error copying from ${src} to ${dest}:`, error);
    }
  }
}

async function prepareDeploy() {
  console.log('Preparing standalone deployment folder...');
  
  const standaloneDir = path.join(__dirname, '.next', 'standalone');
  const standaloneStaticDir = path.join(standaloneDir, '.next', 'static');
  const standalonePublicDir = path.join(standaloneDir, 'public');
  
  const sourceStaticDir = path.join(__dirname, '.next', 'static');
  const sourcePublicDir = path.join(__dirname, 'public');

  // 1. Copy .next/static to .next/standalone/.next/static
  console.log('Copying .next/static...');
  await copyDir(sourceStaticDir, standaloneStaticDir);

  // 2. Copy public to .next/standalone/public
  console.log('Copying public...');
  await copyDir(sourcePublicDir, standalonePublicDir);

  console.log('✅ Deployment folder prepared successfully!');
  console.log('👉 You can now zip the inside of ".next/standalone" and upload it to your server.');
}

prepareDeploy();
