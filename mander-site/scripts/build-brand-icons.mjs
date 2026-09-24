import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const manderDir = process.cwd();
const figurePath = path.join(manderDir, 'public', 'logo-figure.png');

// Helper to convert array of PNG buffers to ICO format
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type (1 = ICO)
  header.writeUInt16LE(images.length, 4); // number of images

  let offset = 6 + (16 * images.length);
  const directoryEntries = [];

  for (const { buffer, size } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    directoryEntries.push(entry);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...images.map((img) => img.buffer)]);
}

async function createIconSquare(size, paddingRatio = 0.12) {
  const padding = Math.round(size * paddingRatio);
  const innerSize = size - (padding * 2);

  // Resize the figure cleanly with transparent padding
  const inner = await sharp(figurePath)
    .resize(innerSize, innerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // Composite onto the brand background (#1b242c)
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 27, g: 36, b: 44, alpha: 1 }, // #1b242c
    },
  })
    .composite([{ input: inner, gravity: 'center' }])
    .png();
}

async function main() {
  console.log('Generating brand icons from', figurePath);

  // 1. 512x512 -> public/logo-mander-square.png
  console.log('Writing public/logo-mander-square.png (512x512)...');
  await (await createIconSquare(512, 0.12)).toFile(
    path.join(manderDir, 'public', 'logo-mander-square.png')
  );

  // 2. 192x192 -> public/icon-192.png
  console.log('Writing public/icon-192.png (192x192)...');
  await (await createIconSquare(192, 0.12)).toFile(
    path.join(manderDir, 'public', 'icon-192.png')
  );

  // 3. 96x96 -> app/icon.png (multiple of 48, sharp on retina Google SERP)
  console.log('Writing app/icon.png (96x96)...');
  await (await createIconSquare(96, 0.10)).toFile(
    path.join(manderDir, 'app', 'icon.png')
  );

  // 4. Generate multi-size favicon.ico (16, 32, 48)
  console.log('Writing app/favicon.ico (16, 32, 48)...');
  const buf16 = await (await createIconSquare(16, 0.08)).toBuffer();
  const buf32 = await (await createIconSquare(32, 0.08)).toBuffer();
  const buf48 = await (await createIconSquare(48, 0.08)).toBuffer();

  const icoBuffer = pngsToIco([
    { size: 16, buffer: buf16 },
    { size: 32, buffer: buf32 },
    { size: 48, buffer: buf48 },
  ]);
  fs.writeFileSync(path.join(manderDir, 'app', 'favicon.ico'), icoBuffer);

  // 5. SVG icon: embedded base64 in SVG for vector resolution
  console.log('Writing app/icon.svg...');
  const icon96Base64 = (await (await createIconSquare(96, 0.10)).toBuffer()).toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
  <rect width="96" height="96" fill="#1b242c"/>
  <image href="data:image/png;base64,${icon96Base64}" width="96" height="96"/>
</svg>
`;
  fs.writeFileSync(path.join(manderDir, 'app', 'icon.svg'), svgContent);

  console.log('All brand icons updated successfully!');
}

main().catch((err) => {
  console.error('Failed to generate brand icons:', err);
  process.exit(1);
});
