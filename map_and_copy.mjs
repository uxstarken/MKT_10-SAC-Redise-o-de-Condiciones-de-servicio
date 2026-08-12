import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const brainDir = 'C:/Users/ivan.gonzalezp/.gemini/antigravity-ide/brain/50001bbf-04fe-4cb2-9576-be67c724a50e';
const publicDir = 'c:/Users/ivan.gonzalezp/Desktop/New-Home-Starken/public';

const fileMap = [
  { src: 'media__1785262539012.png', dest: 'card-expreso-aereo.png' },
  { src: 'media__1785262539026.png', dest: 'card-envio-local.png' },
  { src: 'media__1785262539038.png', dest: 'card-locker.png' },
  { src: 'media__1785262539050.png', dest: 'card-servicio-embalaje.png' },
  { src: 'media__1785262539067.png', dest: 'card-envio-digital.png' }
];

async function cropAndSaveAll() {
  for (const item of fileMap) {
    const fullPath = path.join(brainDir, item.src);
    if (!fs.existsSync(fullPath)) continue;
    
    const img = await Jimp.read(fullPath);
    const w = img.bitmap.width; // 1024
    const h = img.bitmap.height; // 150
    
    // Crop only the left photo region (36.2% width = ~370px)
    const cropW = Math.floor(w * 0.362);
    const photo = img.clone().crop({ x: 0, y: 0, w: cropW, h: h });
    
    const destPath = path.join(publicDir, item.dest);
    await photo.write(destPath);
    console.log(`Successfully saved cropped photo: ${item.dest} (${cropW}x${h})`);
  }
}

cropAndSaveAll().catch(console.error);
