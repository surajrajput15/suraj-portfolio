import { readdir, writeFile, stat, mkdir } from 'node:fs/promises';
import { join, parse, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

const MAX_WIDTH = 1600;
const WIDTHS = [640, 1024, 1600];

const RASTER_EXTS = ['.png', '.jpg', '.jpeg'];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

async function optimizeOne(filePath) {
  const { name, ext } = parse(filePath);
  const lower = ext.toLowerCase();
  if (!RASTER_EXTS.includes(lower)) return null;
  const before = (await stat(filePath)).size;
  const img = sharp(filePath, { failOn: 'none' });
  const meta = await img.metadata();
  const origWidth = meta.width ?? MAX_WIDTH;
  const targetWidths = WIDTHS.filter((w) => w <= Math.min(origWidth, MAX_WIDTH));
  if (targetWidths.length === 0) targetWidths.push(Math.min(origWidth, MAX_WIDTH));

  const { dir } = parse(filePath);
  const results = [];
  for (const w of targetWidths) {
    const avifOut = join(dir, `${name}-${w}.avif`);
    const webpOut = join(dir, `${name}-${w}.webp`);
    const fallbackOut = join(dir, `${name}-${w}${lower}`);
    await sharp(filePath, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 50, effort: 4 })
      .toFile(avifOut);
    await sharp(filePath, { failOn: 'none' })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(webpOut);
    if (lower === '.png') {
      await sharp(filePath, { failOn: 'none' })
        .resize({ width: w, withoutEnlargement: true })
        .png({ compressionLevel: 9, effort: 10 })
        .toFile(fallbackOut);
    } else {
      await sharp(filePath, { failOn: 'none' })
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(fallbackOut);
    }
    results.push({
      w,
      avif: (await stat(avifOut)).size,
      webp: (await stat(webpOut)).size,
      png: (await stat(fallbackOut)).size,
    });
  }
  return {
    src: filePath,
    before,
    results,
    totalAfter: results.reduce((s, r) => s + r.avif + r.webp + r.png, 0),
    origWidth,
    ext: lower,
  };
}

function writeResponsiveMap(entries) {
  const map = {};
  for (const e of entries) {
    if (!e) continue;
    const { dir, name } = parse(e.src);
    const rel = relative(PUBLIC_DIR, dir).replaceAll('\\', '/');
    const relDir = rel === '' ? '' : `/${rel}`;
    const key = `${relDir}/${name}${e.ext}`;
    map[key] = {
      widths: e.results.map((r) => r.w),
      avif: e.results.map((r) => `${relDir}/${name}-${r.w}.avif`),
      webp: e.results.map((r) => `${relDir}/${name}-${r.w}.webp`),
      fallback: e.results.map((r) => `${relDir}/${name}-${r.w}${e.ext}`),
      originalWidth: e.origWidth,
    };
  }
  return map;
}

async function main() {
  const allFiles = await walk(PUBLIC_DIR);
  const rasters = allFiles.filter((f) => {
    const { ext, name } = parse(f);
    if (!RASTER_EXTS.includes(ext.toLowerCase())) return false;
    if (/-\d+-\d+\.(png|jpg|jpeg)$/i.test(name + ext)) return false;
    return true;
  });
  if (rasters.length === 0) {
    console.log('No raster image files found in public/.');
    return;
  }

  console.log(`Optimizing ${rasters.length} raster file(s)...\n`);
  const reports = [];
  for (const p of rasters) {
    try {
      const r = await optimizeOne(p);
      if (!r) continue;
      reports.push(r);
      const rel = relative(PUBLIC_DIR, r.src).replaceAll('\\', '/');
      console.log(`  ${rel}`);
      console.log(`    before: ${fmtBytes(r.before)}  (${r.origWidth}px wide)`);
      for (const row of r.results) {
        console.log(`    ${row.w}px -> avif ${fmtBytes(row.avif)}  webp ${fmtBytes(row.webp)}  ${r.ext.slice(1)} ${fmtBytes(row.png)}`);
      }
    } catch (err) {
      console.error(`  FAILED: ${p}\n    ${err.message}`);
    }
  }

  const totalBefore = reports.reduce((s, r) => s + r.before, 0);
  const totalAfter = reports.reduce((s, r) => s + r.totalAfter, 0);
  console.log(`\nTotal original -> optimized (avif+webp+fallback, all widths):`);
  console.log(`  before: ${fmtBytes(totalBefore)}`);
  console.log(`  after:  ${fmtBytes(totalAfter)}`);
  if (totalBefore > 0) {
    console.log(`  net:    ${(((totalAfter - totalBefore) / totalBefore) * 100).toFixed(1)}% (note: variants across 3 widths)`);
  }

  const map = writeResponsiveMap(reports);
  const mapPath = join(ROOT, 'src', 'data', 'responsiveImages.ts');
  await mkdir(dirname(mapPath), { recursive: true });
  const tsBody =
    '// AUTO-GENERATED by scripts/optimize-images.mjs. Do not edit by hand.\n' +
    '// Run `npm run images:optimize` to regenerate.\n' +
    'export interface ResponsiveEntry {\n' +
    '  widths: number[];\n' +
    '  avif: string[];\n' +
    '  webp: string[];\n' +
    '  fallback: string[];\n' +
    '  originalWidth: number;\n' +
    '}\n\n' +
    'export const RESPONSIVE_IMAGES: Record<string, ResponsiveEntry> = ' +
    JSON.stringify(map, null, 2) +
    ';\n';
  await writeFile(mapPath, tsBody, 'utf8');
  console.log(`\nWrote responsive map: ${relative(ROOT, mapPath)}`);
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
