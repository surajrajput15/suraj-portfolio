import zlib, re

src = 'public/Suraj_Bhan_Pratap_Singh_Resume.pdf'
out = 'public/Suraj_Bhan_Pratap_Singh_Resume_new.pdf'

data = open(src, 'rb').read()

# --- Collect object spans ---
decls = list(re.finditer(rb'\d+\s+0\s+obj', data))
endobjs = list(re.finditer(rb'endobj', data))

objs = []  # (objnum, start, end)
for d in decls:
    objnum = int(d.group(0).split()[0])
    eo = next(e for e in endobjs if e.start() > d.end())
    objs.append((objnum, d.start(), eo.end()))

header = data[:objs[0][1]]
last_end = max(o[2] for o in objs)
trailing = data[last_end:]

def process_obj(obj_bytes):
    sm = re.search(rb'stream\r?\n', obj_bytes)
    if not sm:
        return obj_bytes, False
    data_start = sm.end()
    em = re.search(rb'\r?\nendstream', obj_bytes[data_start:])
    if not em:
        return obj_bytes, False
    data_end = data_start + em.start()
    raw = obj_bytes[data_start:data_end]
    try:
        dec = zlib.decompress(raw)
    except Exception:
        return obj_bytes, False
    if b'surajrajput999' not in dec:
        return obj_bytes, False
    new_dec = dec.replace(b'surajrajput999', b'surajrajput15')
    new_raw = zlib.compress(new_dec, 9)
    pre = obj_bytes[:sm.start()]
    pre = re.sub(rb'(/Length\s+)\d+', lambda m: m.group(1) + str(len(new_raw)).encode(), pre, count=1)
    new_obj = pre + b'stream\r\n' + new_raw + obj_bytes[data_end:]
    return new_obj, True

# --- Rebuild ---
parts = []
changed = 0
for objnum, s, e in objs:
    obj_bytes = data[s:e]
    new_obj, c = process_obj(obj_bytes)
    if c:
        changed += 1
    parts.append((objnum, new_obj))

# --- Build file with new xref ---
body_parts = []
offsets = {}
pos = 0
for objnum, b in parts:
    offsets[objnum] = len(header) + pos
    body_parts.append(b)
    pos += len(b)

body = b''.join(body_parts)
num_objects = max(offsets.keys())

xref_offset = len(header) + len(body)
xref = b'xref\n0 ' + str(num_objects + 1).encode() + b'\n'
xref += b'0000000000 65535 f \n'
for n in range(1, num_objects + 1):
    if n in offsets:
        xref += ('%010d 00000 n \n' % offsets[n]).encode()
    else:
        xref += b'0000000000 65535 f \n'

trailer_match = re.search(rb'trailer\s*<<(.*?)>>\s*startxref', data, re.S)
if trailer_match:
    trailer_dict = b'<<' + trailer_match.group(1) + b'>>'
else:
    trailer_dict = b'<< /Size ' + str(num_objects + 1).encode() + b' /Root 1 0 R >>'

trailer_start = xref_offset + len(xref)
trailer = b'trailer\n' + trailer_dict + b'\nstartxref\n' + str(xref_offset).encode() + b'\n%%EOF\n'

final = header + body + xref + trailer
open(out, 'wb').write(final)

# --- Verify ---
chk = open(out, 'rb').read()
print('objects changed:', changed)
print('old urls remaining in new file:', chk.count(b'surajrajput999'))
print('new urls present:', chk.count(b'surajrajput15'))
print('wrote', out, len(final), 'bytes (original', len(data), ')')
print('startxref in file:', chk[chk.rfind(b'startxref')+10:chk.rfind(b'%%EOF')].strip())