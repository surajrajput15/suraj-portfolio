import ctypes
import struct
import zlib
from ctypes import wintypes

# --- PNG Writer ---
def make_png(width, height, rgba_buffer):
    # PNG signature
    png = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png += struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data
    png += struct.pack('>I', zlib.crc32(b'IHDR' + ihdr_data))
    
    # IDAT chunk (scanline filter byte 0 + RGBA per row)
    raw_data = bytearray()
    row_size = width * 4
    for y in range(height):
        raw_data.append(0) # Filter type 0 (None)
        raw_data.extend(rgba_buffer[y * row_size:(y + 1) * row_size])
        
    compressed = zlib.compress(bytes(raw_data), 9)
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed
    png += struct.pack('>I', zlib.crc32(b'IDAT' + compressed))
    
    # IEND chunk
    png += struct.pack('>I', 0) + b'IEND'
    png += struct.pack('>I', zlib.crc32(b'IEND'))
    
    return png

# --- Windows GDI Rendering ---
def generate_og_image(output_path="public/og-image.png"):
    width = 1200
    height = 630
    
    gdi32 = ctypes.windll.gdi32
    user32 = ctypes.windll.user32
    
    # Create Memory DC
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
    bmi.biHeight = -height # Top-down DIB
    bmi.biPlanes = 1
    bmi.biBitCount = 32
    bmi.biCompression = 0 # BI_RGB
    
    bits_ptr = ctypes.c_void_p()
    hbitmap = gdi32.CreateDIBSection(
        hdc,
        ctypes.byref(bmi),
        0,
        ctypes.byref(bits_ptr),
        None,
        0
    )
    
    gdi32.SelectObject(hdc, hbitmap)
    
    # Colors (BGR format in GDI: 0x00BBGGRR)
    c_bg = 0x00090707        # #070709
    c_card_bg = 0x0012100E   # #0E1012
    c_border = 0x002A2420    # Subtle border
    c_accent_blue = 0x00FA8F3B # Vibrant Blue #3B8FFA in BGR (0xFA 0x8F 0x3B)
    c_emerald = 0x0081B910   # #10B981
    c_white = 0x00FFFFFF
    c_gray = 0x00A0A0A0
    c_dark_gray = 0x00707070
    
    # Fill Background
    rect_full = wintypes.RECT(0, 0, width, height)
    h_bg_brush = gdi32.CreateSolidBrush(c_bg)
    user32.FillRect(hdc, ctypes.byref(rect_full), h_bg_brush)
    gdi32.DeleteObject(h_bg_brush)
    
    # Outer Border Box
    h_pen_outer = gdi32.CreatePen(0, 2, c_border) # PS_SOLID = 0
    h_old_pen = gdi32.SelectObject(hdc, h_pen_outer)
    h_null_brush = gdi32.GetStockObject(5) # NULL_BRUSH = 5
    h_old_brush = gdi32.SelectObject(hdc, h_null_brush)
    gdi32.RoundRect(hdc, 30, 30, width - 30, height - 30, 36, 36)
    
    # Helper to create font
    def make_font(name, size, weight=400):
        # CLEARTYPE_QUALITY = 5, ANTIALIASED_QUALITY = 4
        return gdi32.CreateFontW(
            -size, 0, 0, 0,
            weight, 0, 0, 0,
            1, 0, 0, 5, 0,
            name
        )
        
    gdi32.SetBkMode(hdc, 1) # TRANSPARENT = 1
    
    # Draw SB Monogram Badge
    h_card_brush = gdi32.CreateSolidBrush(0x00181414)
    gdi32.SelectObject(hdc, h_card_brush)
    gdi32.RoundRect(hdc, 80, 80, 136, 136, 20, 20)
    gdi32.DeleteObject(h_card_brush)
    
    # Monogram Text
    h_mono_font = make_font("Segoe UI", 26, 700)
    gdi32.SelectObject(hdc, h_mono_font)
    gdi32.SetTextColor(hdc, c_white)
    user32.DrawTextW(hdc, "SB", -1, ctypes.byref(wintypes.RECT(80, 80, 136, 136)), 0x01 | 0x04 | 0x20) # DT_CENTER | DT_VCENTER | DT_SINGLELINE
    gdi32.DeleteObject(h_mono_font)
    
    # Status Pill
    h_pill_pen = gdi32.CreatePen(0, 1, 0x004A7010)
    gdi32.SelectObject(hdc, h_pill_pen)
    h_pill_brush = gdi32.CreateSolidBrush(0x001A2808)
    gdi32.SelectObject(hdc, h_pill_brush)
    gdi32.RoundRect(hdc, 154, 90, 480, 126, 36, 36)
    gdi32.DeleteObject(h_pill_pen)
    gdi32.DeleteObject(h_pill_brush)
    
    h_status_font = make_font("Segoe UI", 14, 600)
    gdi32.SelectObject(hdc, h_status_font)
    gdi32.SetTextColor(hdc, c_emerald)
    user32.DrawTextW(hdc, "●  Open to Full Stack & AI Roles", -1, ctypes.byref(wintypes.RECT(174, 90, 460, 126)), 0x04 | 0x20) # DT_VCENTER | DT_SINGLELINE
    gdi32.DeleteObject(h_status_font)
    
    # Main Heading: Suraj Bhan Pratap Singh
    h_title_font = make_font("Segoe UI", 56, 700)
    gdi32.SelectObject(hdc, h_title_font)
    gdi32.SetTextColor(hdc, c_white)
    user32.DrawTextW(hdc, "Suraj Bhan Pratap Singh", -1, ctypes.byref(wintypes.RECT(80, 165, 1100, 240)), 0x00)
    gdi32.DeleteObject(h_title_font)
    
    # Subheading: Full Stack Developer + AI
    h_role_font = make_font("Consolas", 26, 700)
    gdi32.SelectObject(hdc, h_role_font)
    gdi32.SetTextColor(hdc, c_accent_blue)
    user32.DrawTextW(hdc, "Full Stack Developer + AI", -1, ctypes.byref(wintypes.RECT(80, 245, 1100, 290)), 0x00)
    gdi32.DeleteObject(h_role_font)
    
    # Tagline
    h_tag_font = make_font("Segoe UI", 21, 400)
    gdi32.SelectObject(hdc, h_tag_font)
    gdi32.SetTextColor(hdc, c_gray)
    user32.DrawTextW(hdc, "Building production-oriented web applications and AI-powered products.", -1, ctypes.byref(wintypes.RECT(80, 295, 1100, 340)), 0x00)
    gdi32.DeleteObject(h_tag_font)
    
    # Divider Line
    h_line_pen = gdi32.CreatePen(0, 1, c_border)
    gdi32.SelectObject(hdc, h_line_pen)
    gdi32.MoveToEx(hdc, 80, 360, None)
    gdi32.LineTo(hdc, 1120, 360)
    gdi32.DeleteObject(h_line_pen)
    
    # 3 Highlight Cards
    card_w = 325
    card_h = 130
    gap = 32
    start_x = 80
    start_y = 395
    
    cards = [
        ("FEATURED PLATFORMS", "StudySnap · Cartify · Notes Nexus", c_white),
        ("ENGINEERING STACK", "React · Next.js · Node · PostgreSQL", c_white),
        ("APPLIED AI WORKFLOWS", "Groq LLaMA-3.1 · Gemini APIs", c_white),
    ]
    
    h_lbl_font = make_font("Consolas", 13, 600)
    h_val_font = make_font("Segoe UI", 16, 600)
    
    for idx, (label, val, col) in enumerate(cards):
        cx = start_x + idx * (card_w + gap)
        
        # Card Background
        h_c_brush = gdi32.CreateSolidBrush(c_card_bg)
        h_c_pen = gdi32.CreatePen(0, 1, c_border)
        gdi32.SelectObject(hdc, h_c_brush)
        gdi32.SelectObject(hdc, h_c_pen)
        gdi32.RoundRect(hdc, cx, start_y, cx + card_w, start_y + card_h, 20, 20)
        gdi32.DeleteObject(h_c_brush)
        gdi32.DeleteObject(h_c_pen)
        
        # Label
        gdi32.SelectObject(hdc, h_lbl_font)
        gdi32.SetTextColor(hdc, c_dark_gray)
        user32.DrawTextW(hdc, label, -1, ctypes.byref(wintypes.RECT(cx + 20, start_y + 24, cx + card_w - 20, start_y + 50)), 0x00)
        
        # Value
        gdi32.SelectObject(hdc, h_val_font)
        gdi32.SetTextColor(hdc, col)
        user32.DrawTextW(hdc, val, -1, ctypes.byref(wintypes.RECT(cx + 20, start_y + 58, cx + card_w - 20, start_y + 115)), 0x10) # DT_WORDBREAK
        
    gdi32.DeleteObject(h_lbl_font)
    gdi32.DeleteObject(h_val_font)
    
    # Read raw buffer from DIB (BGRA to RGBA)
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
        rgba_bytes[i + 3] = 255 # Alpha 100%
        
    # Write PNG
    png_data = make_png(width, height, rgba_bytes)
    with open(output_path, "wb") as f:
        f.write(png_data)
        
    print(f"Successfully generated {output_path} ({width}x{height}, {len(png_data)} bytes)")
    
    # Cleanup GDI handles
    gdi32.SelectObject(hdc, h_old_pen)
    gdi32.SelectObject(hdc, h_old_brush)
    gdi32.DeleteObject(h_pen_outer)
    gdi32.DeleteObject(hbitmap)
    gdi32.DeleteDC(hdc)
    user32.ReleaseDC(0, hdc_screen)

if __name__ == "__main__":
    generate_og_image()
