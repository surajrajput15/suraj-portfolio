from pypdf import PdfReader, PdfWriter
from pypdf.generic import create_string_object

src = 'public/Suraj_Bhan_Pratap_Singh_Resume.pdf'
out = 'public/Suraj_Bhan_Pratap_Singh_Resume_fixed.pdf'

reader = PdfReader(src)
writer = PdfWriter(clone_from=reader)

replaced = 0
for page in writer.pages:
    annots = page.get('/Annots')
    if not annots:
        continue
    for ref in annots:
        try:
            obj = ref.get_object()
        except Exception:
            continue
        a_ref = obj.get('/A')
        if a_ref is None:
            continue
        a = a_ref.get_object() if not isinstance(a_ref, dict) else a_ref
        if not isinstance(a, dict):
            continue
        if a.get('/S') == '/URI':
            uri = a.get('/URI')
            if isinstance(uri, str) and 'surajrajput999' in uri:
                a[create_string_object('/URI')] = create_string_object(uri.replace('surajrajput999', 'surajrajput15'))
                replaced += 1

with open(out, 'wb') as f:
    writer.write(f)

print('URI annotations replaced:', replaced)

# --- Verify ---
chk = PdfReader(out)
print('pages:', len(chk.pages))
uris = []
for page in chk.pages:
    annots = page.get('/Annots')
    if not annots:
        continue
    for ref in annots:
        try:
            obj = ref.get_object()
        except Exception:
            continue
        a = obj.get('/A')
        if a:
            a = a.get_object() if not isinstance(a, dict) else a
            uri = a.get('/URI') if isinstance(a, dict) else None
            if isinstance(uri, str) and ('github' in uri or 'linkedin' in uri or 'vercel' in uri):
                uris.append(uri)
for u in sorted(set(uris)):
    print(u)