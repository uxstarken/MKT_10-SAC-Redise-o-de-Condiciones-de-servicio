import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/ivan.gonzalezp/.gemini/antigravity-ide/brain/50001bbf-04fe-4cb2-9576-be67c724a50e';

function findFiles(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!f.startsWith('.')) findFiles(full);
    } else if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp')) {
      console.log(`${full} (${stat.size} bytes)`);
    }
  }
}

findFiles(brainDir);
