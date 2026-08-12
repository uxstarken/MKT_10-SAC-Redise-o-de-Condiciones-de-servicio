import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const tempDir = 'C:/Users/ivan.gonzalezp/.gemini/antigravity-ide/brain/50001bbf-04fe-4cb2-9576-be67c724a50e/.tempmediaStorage';
const files = fs.readdirSync(tempDir);

async function inspect() {
  for (const f of files) {
    if (!f.endsWith('.png')) continue;
    const p = path.join(tempDir, f);
    try {
      const img = await Jimp.read(p);
      console.log(`${f}: ${img.bitmap.width}x${img.bitmap.height}`);
    } catch (e) {
      console.log(`${f}: error reading`);
    }
  }
}

inspect();
