import { PDFDocument } from 'pdf-lib';
import { readFile } from 'fs/promises';

const SRC = 'public/Suraj_Bhan_Pratap_Singh_Resume.pdf';

async function main() {
  const bytes = await readFile(SRC);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
  const pageCount = pdf.getPageCount();

  let linkCount = 0;
  const uris = [];
  for (const page of pdf.getPages()) {
    const annots = page.node.Annots();
    if (!annots) continue;
    for (const ref of annots.array) {
      const obj = pdf.context.lookup(ref);
      if (!obj || !obj.dict) continue;
      const a = obj.dict.get(pdf.context.obj('A'));
      if (!a) continue;
      const aDict = pdf.context.lookup(a);
      if (aDict && aDict.dict) {
        const uri = aDict.dict.get(pdf.context.obj('URI'));
        if (uri) {
          linkCount++;
          const uriStr = typeof uri === 'string' ? uri : pdf.context.lookup(uri).toString();
          uris.push(uriStr);
        }
      }
    }
  }

  console.log('Pages:', pageCount);
  console.log('Link annotations:', linkCount);
  console.log('URIs:');
  for (const u of [...new Set(uris)]) console.log('  ' + u);
}

main().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
