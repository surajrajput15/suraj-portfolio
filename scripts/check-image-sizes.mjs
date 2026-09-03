import { readdir, stat } from 'node:fs/promises';
import { join, dirname, relative, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

const RASTER_EXTS = ['.png', '.jpg', '.jpeg'];
const BUDGET_BYTES = 600 * 1024;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const all = await walk(PUBLIC_DIR);
const rasters = all.filter((f) => {
  const { ext, name } = parse(f);
  if (!RASTER_EXTS.includes(ext.toLowerCase())) return false;
  if (/-\d+-\d+\.(png|jpg|jpeg)$/i.test(name + ext)) return false;
  return true;
});
const bad = [];
for (const p of rasters) {
  const { dir, name } = parse(p);
  const hasAvif = (await stat(join(dir, `${name}-640.avif`)).catch(() => null)) !== null;
  if (hasAvif) continue;
  const s = (await stat(p)).size;
  if (s > BUDGET_BYTES) bad.push({ path: p, size: s });
}

if (bad.length > 0) {
  console.error(`Image budget check FAILED. Rasters over ${BUDGET_BYTES / 1024}KB without optimized variants:`);
  for (const o of bad) console.error(`  ${relative(ROOT, o.path)} -> ${(o.size / 1024).toFixed(0)}KB`);
  console.error(`\nRun \`npm run images:optimize\` to generate AVIF/WebP variants.`);
  process.exit(1);
}

console.log(`OK: all raster source files either under ${BUDGET_BYTES / 1024}KB or have optimized variants.`);
