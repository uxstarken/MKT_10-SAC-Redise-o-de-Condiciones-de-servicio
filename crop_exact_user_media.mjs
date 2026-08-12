import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const brainDir = 'C:/Users/ivan.gonzalezp/.gemini/antigravity-ide/brain/50001bbf-04fe-4cb2-9576-be67c724a50e';
const publicDir = 'c:/Users/ivan.gonzalezp/Desktop/New-Home-Starken/public';

const userMediaFiles = [
  'media__1785262539012.png',
  'media__1785262539026.png',
  'media__1785262539038.png',
  'media__1785262539050.png',
  'media__1785262539067.png'
];

async function processUserMedia() {
  for (const filename of userMediaFiles) {
    const fullPath = path.join(brainDir, filename);
    if (!fs.existsSync(fullPath)) continue;
    
    const img = await Jimp.read(fullPath);
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    console.log(`${filename}: size ${w}x${h}`);
    
    // Crop only the left photo region (36.2% width)
    const cropW = Math.floor(w * 0.362);
    const photo = img.clone().crop({ x: 0, y: 0, w: cropW, h: h });
    
    // Save temporary inspect PNGs to check mapping
    await photo.write(path.join(brainDir, `cropped_${filename}`));
  }
}

processUserMedia().catch(console.error);
