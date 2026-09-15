import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const INK = [0x14, 0x12, 0x0f, 0xff];
const CREAM = [0xf5, 0xf2, 0xec, 0xff];
const TRANSPARENT = [0, 0, 0, 0];

function crc32(buf) {
  let crc = ~0;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, crcInput, crc]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0;
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function roundedRectAlpha(x, y, size, radius) {
  const dx = Math.min(x, size - 1 - x);
  const dy = Math.min(y, size - 1 - y);
  if (dx >= radius || dy >= radius) return 1;
  const cx = radius - 0.5 - dx;
  const cy = radius - 0.5 - dy;
  const d = Math.sqrt(cx * cx + cy * cy);
  const edge = radius - 0.35;
  if (d <= edge - 0.5) return 1;
  if (d >= edge + 0.5) return 0;
  return 1 - (d - (edge - 0.5));
}

function drawMonogram(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const cx = (size - 1) / 2;
  const cy = (size - 1) / 2;
  const outer = size <= 16 ? size * 0.36 : size * 0.31;
  const inner = size <= 16 ? size * 0.15 : size * 0.175;
  const radius = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cover = roundedRectAlpha(x, y, size, radius);
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ring = 1 - Math.min(1, Math.abs(dist - (outer + inner) / 2) / ((outer - inner) / 2 + 0.55));
      const ringCover = Math.max(0, Math.min(1, ring));

      const r = INK[0] * cover;
      const g = INK[1] * cover;
      const b = INK[2] * cover;
      const a = 255 * cover;

      const outR = r * (1 - ringCover) + CREAM[0] * ringCover;
      const outG = g * (1 - ringCover) + CREAM[1] * ringCover;
      const outB = b * (1 - ringCover) + CREAM[2] * ringCover;

      const i = (y * size + x) * 4;
      if (a < 1) {
        pixels.set(TRANSPARENT, i);
      } else {
        pixels[i] = Math.round(outR);
        pixels[i + 1] = Math.round(outG);
        pixels[i + 2] = Math.round(outB);
        pixels[i + 3] = Math.round(a);
      }
    }
  }

  return pixels;
}

function icoFromPngs(entries) {
  const count = entries.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const parts = [header];
  entries.forEach((entry, index) => {
    const pos = 6 + index * 16;
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, pos);
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, pos + 1);
    header.writeUInt8(0, pos + 2);
    header.writeUInt8(0, pos + 3);
    header.writeUInt16LE(1, pos + 4);
    header.writeUInt16LE(32, pos + 6);
    header.writeUInt32LE(entry.png.length, pos + 8);
    header.writeUInt32LE(offset, pos + 12);
    parts.push(entry.png);
    offset += entry.png.length;
  });

  return Buffer.concat(parts);
}

const sizes = [16, 32, 48];
const pngs = sizes.map((size) => ({
  size,
  png: encodePng(size, size, drawMonogram(size)),
}));

const ico = icoFromPngs(pngs);
const out = join(dirname(fileURLToPath(import.meta.url)), "../app/favicon.ico");
writeFileSync(out, ico);
console.log(`Wrote ${out} (${ico.length} bytes)`);
