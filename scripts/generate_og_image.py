import ctypes
import struct
import zlib
from ctypes import wintypes

# --- PNG Writer ---
def make_png(width, height, rgba_buffer):
    png = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png += struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data
    png += struct.pack('>I', zlib.crc32(b'IHDR' + ihdr_data))
    raw_data = bytearray()
    row_size = width * 4
    for y in range(height):
        raw_data.append(0)
        raw_data.extend(rgba_buffer[y * row_size:(y + 1) * row_size])
    compressed = zlib.compress(bytes(raw_data), 9)
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed
    png += struct.pack('>I', zlib.crc32(b'IDAT' + compressed))
    png += struct.pack('>I', 0) + b'IEND'
    png += struct.pack('>I', zlib.crc32(b'IEND'))
    return png

# --- Windows GDI Rendering ---
def generate_og_image(output_path="public/og-image.png"):
    width = 1200
    height = 630

    gdi32 = ctypes.windll.gdi32
    user32 = ctypes.windll.user32

    hdc_screen = user32.GetDC(0)
    hdc = gdi32.CreateCompatibleDC(hdc_screen)

    class BITMAPINFOHEADER(ctypes.Structure):
        _fields_ = [
            ('biSize', wintypes.DWORD),
            ('biWidth', wintypes.LONG),
            ('biHeight', wintypes.LONG),
            ('biPlanes', wintypes.WORD),
            ('biBitCount', wintypes.WORD),
            ('biCompression', wintypes.DWORD),
            ('biSizeImage', wintypes.DWORD),
            ('biXPelsPerMeter', wintypes.LONG),
            ('biYPelsPerMeter', wintypes.LONG),
            ('biClrUsed', wintypes.DWORD),
            ('biClrImportant', wintypes.DWORD)
        ]

    bmi = BITMAPINFOHEADER()
    bmi.biSize = ctypes.sizeof(BITMAPINFOHEADER)
    bmi.biWidth = width
    bmi.biHeight = -height
    bmi.biPlanes = 1
    bmi.biBitCount = 32
    bmi.biCompression = 0

    bits_ptr = ctypes.c_void_p()
    hbitmap = gdi32.CreateDIBSection(
        hdc, ctypes.byref(bmi), 0, ctypes.byref(bits_ptr), None, 0
    )
    gdi32.SelectObject(hdc, hbitmap)

    # Colors (BGR)
    c_bg = 0x000B0808
    c_card_bg = 0x00130E0E
    c_border = 0x00202428
    c_violet = 0x008B8FFA
    c_fuchsia = 0x00F979E8
    c_emerald = 0x0081B910
    c_white = 0x00FFFFFF
    c_gray = 0x00A1A1A1
    c_dark_gray = 0x007A7171

    def fill_rect(x, y, w, h, bgr):
        brush = gdi32.CreateSolidBrush(bgr)
        user32.FillRect(hdc, ctypes.byref(wintypes.RECT(x, y, x + w, y + h)), brush)
        gdi32.DeleteObject(brush)

    def round_rect(x, y, w, h, rx, ry, bgr_fill=None, pen_bgr=None, pen_w=1):
        old_pen = None
        old_brush = None
        if pen_bgr is not None:
            pen = gdi32.CreatePen(0, pen_w, pen_bgr)
            old_pen = gdi32.SelectObject(hdc, pen)
        if bgr_fill is not None:
            brush = gdi32.CreateSolidBrush(bgr_fill)
            old_brush = gdi32.SelectObject(hdc, brush)
        else:
            null_brush = gdi32.GetStockObject(5)
            old_brush = gdi32.SelectObject(hdc, null_brush)
        gdi32.RoundRect(hdc, x, y, x + w, y + h, rx, ry)
        if old_pen is not None:
            gdi32.SelectObject(hdc, old_pen)
            gdi32.DeleteObject(pen)
        if old_brush is not None:
            gdi32.SelectObject(hdc, old_brush)
            if bgr_fill is not None:
                gdi32.DeleteObject(brush)

    def make_font(name, size, weight=400, italic=False):
        return gdi32.CreateFontW(
            -size, 0, 0, 0, weight, italic, 0, 0,
            1, 0, 0, 5, 0, name
        )

    def draw_text(text, x, y, w, h, font, bgr, flags=0x00):
        gdi32.SelectObject(hdc, font)
        gdi32.SetTextColor(hdc, bgr)
        gdi32.SetBkMode(hdc, 1)
        user32.DrawTextW(hdc, text, -1, ctypes.byref(wintypes.RECT(x, y, x + w, y + h)), flags)

    gdi32.SetBkMode(hdc, 1)

    # Background gradient (simulated with solid)
    fill_rect(0, 0, width, height, c_bg)

    # Outer border
    round_rect(24, 24, 1152, 582, 24, 24, pen_bgr=c_border, pen_w=2)

    # ---- Right Side Photo with Violet Ring ----
    photo_cx, photo_cy = 1010, 155
    photo_r_outer = 86
    photo_r_inner = 82

    # Glow halo (rough approximation with concentric circles)
    for i, alpha in enumerate([40, 30, 20, 12]):
        r = photo_r_outer + 30 + i * 12
        brush = gdi32.CreateSolidBrush(0x00FA8FFA if i % 2 == 0 else 0x008FFAE8)
        # Use a faded color - actual alpha blending not possible, so use lighter color
        gdi32.DeleteObject(brush)
        brush = gdi32.CreateSolidBrush(c_violet if i % 2 == 0 else c_fuchsia)
        gdi32.SelectObject(hdc, brush)
        null_pen = gdi32.SelectObject(hdc, gdi32.CreatePen(0, 1, c_violet))
        gdi32.Ellipse(hdc, photo_cx - r, photo_cy - r, photo_cx + r, photo_cy + r)
        gdi32.DeleteObject(brush)
        gdi32.SelectObject(hdc, null_pen)
        gdi32.DeleteObject(null_pen)

    # Photo background (dark fill)
    brush = gdi32.CreateSolidBrush(0x000C0A0A)
    gdi32.SelectObject(hdc, brush)
    gdi32.Ellipse(hdc, photo_cx - photo_r_inner, photo_cy - photo_r_inner,
                  photo_cx + photo_r_inner, photo_cy + photo_r_inner)
    gdi32.DeleteObject(brush)

    # Photo outer ring (violet gradient - simulated with single violet color)
    pen = gdi32.CreatePen(0, 6, c_violet)
    old_pen = gdi32.SelectObject(hdc, pen)
    null_brush = gdi32.SelectObject(hdc, gdi32.GetStockObject(5))
    gdi32.Ellipse(hdc, photo_cx - photo_r_outer, photo_cy - photo_r_outer,
                  photo_cx + photo_r_outer, photo_cy + photo_r_outer)
    gdi32.SelectObject(hdc, old_pen)
    gdi32.DeleteObject(pen)
    gdi32.SelectObject(hdc, null_brush)

    # Photo initials "SB"
    photo_font = make_font("Segoe UI", 56, 800)
    draw_text("SB", photo_cx - 50, photo_cy - 40, 100, 80, photo_font, c_white,
              0x01 | 0x04 | 0x20)
    gdi32.DeleteObject(photo_font)

    # ---- Left Content ----
    # Monogram box
    round_rect(80, 80, 52, 52, 14, 14, bgr_fill=0x00181218, pen_bgr=0x001F1F26, pen_w=2)
    mono_font = make_font("Segoe UI", 22, 800)
    draw_text("SB", 80, 80, 52, 52, mono_font, c_white, 0x01 | 0x04 | 0x20)
    gdi32.DeleteObject(mono_font)

    # Status pill
    round_rect(148, 88, 310, 36, 18, 18, bgr_fill=0x0008281A, pen_bgr=0x0010704A, pen_w=1)
    # Green dot
    brush = gdi32.CreateSolidBrush(c_emerald)
    gdi32.SelectObject(hdc, brush)
    gdi32.Ellipse(hdc, 164, 100, 174, 110)
    gdi32.DeleteObject(brush)
    # Status text
    status_font = make_font("Segoe UI", 13, 600)
    draw_text("Open to Engineering Roles", 180, 88, 280, 36, status_font, c_emerald,
              0x04 | 0x20)
    gdi32.DeleteObject(status_font)

    # Main title
    title_font = make_font("Segoe UI", 52, 800)
    draw_text("Suraj Bhan Pratap Singh", 80, 220, 700, 70, title_font, c_white, 0x00)
    gdi32.DeleteObject(title_font)

    # Role subtitle
    role_font = make_font("Consolas", 24, 700)
    draw_text("Full Stack Developer + AI", 80, 280, 700, 40, role_font, c_violet, 0x00)
    gdi32.DeleteObject(role_font)

    # Tagline
    tag_font = make_font("Segoe UI", 20, 400)
    draw_text("Building production-oriented web applications and AI-powered products.",
              80, 325, 800, 40, tag_font, c_gray, 0x00)
    gdi32.DeleteObject(tag_font)

    # Divider line
    pen = gdi32.CreatePen(0, 1, c_border)
    gdi32.SelectObject(hdc, pen)
    gdi32.MoveToEx(hdc, 80, 400, None)
    gdi32.LineTo(hdc, 1120, 400)
    gdi32.DeleteObject(pen)

    # 3 Highlight cards
    cards = [
        ("CORE PROJECTS", "StudySnap · Cartify · Notes Nexus"),
        ("FULL STACK ARCHITECTURE", "React · Next.js · Node · PostgreSQL"),
        ("AI WORKFLOWS", "Groq LLaMA-3.1 · Gemini APIs"),
    ]
    card_w, card_h, gap, start_x, start_y = 333, 95, 20, 80, 430
    lbl_font = make_font("Consolas", 12, 600)
    val_font = make_font("Segoe UI", 16, 600)
    for idx, (label, val) in enumerate(cards):
        cx = start_x + idx * (card_w + gap)
        round_rect(cx, start_y, card_w, card_h, 16, 16, bgr_fill=c_card_bg,
                   pen_bgr=0x0014171A, pen_w=1)
        draw_text(label, cx + 20, start_y + 22, card_w - 40, 22, lbl_font, c_dark_gray, 0x00)
        draw_text(val, cx + 20, start_y + 52, card_w - 40, 30, val_font, c_white, 0x00)
    gdi32.DeleteObject(lbl_font)
    gdi32.DeleteObject(val_font)

    # Read raw buffer (BGRA -> RGBA)
    total_bytes = width * height * 4
    raw_buffer = (ctypes.c_ubyte * total_bytes).from_address(bits_ptr.value)
    rgba_bytes = bytearray(total_bytes)
    for i in range(0, total_bytes, 4):
        b = raw_buffer[i]
        g = raw_buffer[i + 1]
        r = raw_buffer[i + 2]
        rgba_bytes[i] = r
        rgba_bytes[i + 1] = g
        rgba_bytes[i + 2] = b
        rgba_bytes[i + 3] = 255

    png_data = make_png(width, height, rgba_bytes)
    with open(output_path, "wb") as f:
        f.write(png_data)

    print(f"Successfully generated {output_path} ({width}x{height}, {len(png_data)} bytes)")

    gdi32.DeleteObject(hbitmap)
    gdi32.DeleteDC(hdc)
    user32.ReleaseDC(0, hdc_screen)

if __name__ == "__main__":
    generate_og_image()
