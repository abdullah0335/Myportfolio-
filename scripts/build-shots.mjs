// Reads the screenshots in public/work and writes lib/shots.json with their real
// pixel dimensions (needed by next/image). Run after capturing new screenshots:
//   node scripts/build-shots.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "work");

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    // SOF0..SOF15 except DHT(C4), JPG(C8), DAC(CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("Not a JPEG");
}

const shots = {};
for (const file of readdirSync(dir).sort()) {
  const m = file.match(/^(.+)-(hero|full|mobile|thumb)\.jpg$/);
  if (!m) continue;
  const [, slug, kind] = m;
  const { width, height } = jpegSize(readFileSync(join(dir, file)));
  (shots[slug] ??= {})[kind] = { src: `/work/${file}`, width, height };
}

writeFileSync(join(root, "lib", "shots.json"), JSON.stringify(shots, null, 2) + "\n");
console.log(`Wrote ${Object.keys(shots).length} projects to lib/shots.json`);
