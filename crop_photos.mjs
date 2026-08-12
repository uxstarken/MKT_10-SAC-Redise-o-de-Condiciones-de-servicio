import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

const tempDir = 'C:/Users/ivan.gonzalezp/.gemini/antigravity-ide/brain/50001bbf-04fe-4cb2-9576-be67c724a50e/.tempmediaStorage';
const publicDir = 'c:/Users/ivan.gonzalezp/Desktop/New-Home-Starken/public';

const targetFiles = [
  { src: 'media_50001bbf-04fe-4cb2-9576-be67c724a50e_1785261028846.png', dest: 'card-expreso-aereo.png' },
  { src: 'media_50001bbf-04fe-4cb2-9576-be67c724a50e_1785261035795.png', dest: 'card-envio-local.png' },
  { src: 'media_50001bbf-04fe-4cb2-9576-be67c724a50e_1785261039464.png', dest: 'card-locker.png' },
  { src: 'media_50001bbf-04fe-4cb2-9576-be67c724a50e_1785261043095.png', dest: 'card-servicio-embalaje.png' },
  { src: 'media_50001bbf-04fe-4cb2-9576-be67c724a50e_1785261046708.png', dest: 'card-envio-digital.png' }
];

async function main() {
  for (const item of targetFiles) {
    const srcPath = path.join(tempDir, item.src);
    const destPath = path.join(publicDir, item.dest);
    if (fs.existsSync(srcPath)) {
      const image = await Jimp.read(srcPath);
      const w = image.bitmap.width;
      const h = image.bitmap.height;
      const cropW = Math.floor(w * 0.362);
      image.crop({ x: 0, y: 0, w: cropW, h: h });
      await image.write(destPath);
      console.log(`Cropped and saved left photo for ${item.dest} (${cropW}x${h})`);
    } else {
      console.log(`Source not found: ${srcPath}`);
    }
  }
}

main().catch(console.error);
