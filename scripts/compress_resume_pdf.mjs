import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile, stat } from 'fs/promises';

const SRC = 'public/Suraj_Bhan_Pratap_Singh_Resume.pdf';
const OUT = 'public/Suraj_Bhan_Pratap_Singh_Resume.pdf';

async function main() {
  const before = (await stat(SRC)).size;
  const bytes = await readFile(SRC);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });

  const optimized = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  await writeFile(OUT, optimized);

  const after = (await stat(OUT)).size;
  const reduction = ((1 - after / before) * 100).toFixed(1);
  console.log(`Before: ${before} bytes`);
  console.log(`After:  ${after} bytes`);
  console.log(`Reduction: ${reduction}%`);
}

main().catch((err) => {
  console.error('Compression failed:', err);
  process.exit(1);
});
