import sys
import struct
import subprocess
import os

def load_bmp(path):
    temp = "temp_load.bmp"
    subprocess.run(["sips", "-s", "format", "bmp", path, "--out", temp], check=True, stdout=subprocess.DEVNULL)
    with open(temp, "rb") as f:
        data = f.read()
    if os.path.exists(temp): os.remove(temp)
    
    data_offset = struct.unpack_from("<I", data, 10)[0]
    w, h = struct.unpack_from("<ii", data, 18)
    bpp = struct.unpack_from("<H", data, 28)[0]
    stride = ((w * (bpp // 8) + 3) // 4) * 4
    is_top_down = (h < 0)
    actual_h = abs(h)
    return {
        "data": data, "data_offset": data_offset, "w": w, "h": actual_h,
        "bpp": bpp, "stride": stride, "is_top_down": is_top_down
    }

def get_pixel(bmp, x, y):
    r_idx = y if bmp["is_top_down"] else (bmp["h"] - 1 - y)
    offset = bmp["data_offset"] + r_idx * bmp["stride"] + x * (bmp["bpp"] // 8)
    b = bmp["data"][offset]
    g = bmp["data"][offset+1]
    r = bmp["data"][offset+2]
    return (r, g, b)

def save_top_down_bmp(pixels_rgb, width, height, dst_path):
    bytes_per_pixel = 3
    stride = ((width * bytes_per_pixel + 3) // 4) * 4
    pixel_size = stride * height
    file_size = 54 + pixel_size
    
    header = bytearray(54)
    header[0:2] = b'BM'
    struct.pack_into("<I", header, 2, file_size)
    struct.pack_into("<I", header, 10, 54)
    struct.pack_into("<I", header, 14, 40)
    struct.pack_into("<ii", header, 18, width, -height) # top-down
    struct.pack_into("<H", header, 26, 1)
    struct.pack_into("<H", header, 28, 24)
    struct.pack_into("<I", header, 34, pixel_size)
    
    buf = bytearray(pixel_size)
    for y in range(height):
        row_offset = y * stride
        for x in range(width):
            r, g, b = pixels_rgb[y][x]
            p_offset = row_offset + x * 3
            buf[p_offset] = b
            buf[p_offset+1] = g
            buf[p_offset+2] = r
            
    temp = "temp_out.bmp"
    with open(temp, "wb") as f:
        f.write(header)
        f.write(buf)
        
    ext = os.path.splitext(dst_path)[1].lower()
    fmt = "jpeg" if ext in [".jpg", ".jpeg"] else "png"
    subprocess.run(["sips", "-s", "format", fmt, temp, "--out", dst_path], check=True, stdout=subprocess.DEVNULL)
    if os.path.exists(temp): os.remove(temp)
    print(f"Generated {dst_path} ({width}x{height})")

def build_all():
    os.makedirs("public/assets", exist_ok=True)
    bmp1 = load_bmp("wedding-invite-brief/screenshots/01-gate-landing.jpg")
    bmp2 = load_bmp("wedding-invite-brief/screenshots/02-tap-to-open-cover.jpg")
    bmp4 = load_bmp("wedding-invite-brief/screenshots/04-main-scroll-2.jpg")
    bmp5 = load_bmp("wedding-invite-brief/screenshots/05-main-scroll-3.jpg")
    bmp6 = load_bmp("wedding-invite-brief/screenshots/06-main-scroll-4.jpg")
    bmp7 = load_bmp("wedding-invite-brief/screenshots/07-main-scroll-5.jpg")

    # 1. Gate Cover (420x315)
    gate_pixels = [[get_pixel(bmp1, x, y) for x in range(417, 417 + 420)] for y in range(356, 356 + 315)]
    save_top_down_bmp(gate_pixels, 420, 315, "public/assets/gate-cover.jpg")

    # 2. Intro Cover (760x1350)
    cover_w, cover_h = 760, 1350
    cover_x = (1253 - cover_w) // 2
    cover_pixels = [[get_pixel(bmp2, x, y) for x in range(cover_x, cover_x + cover_w)] for y in range(cover_h)]
    save_top_down_bmp(cover_pixels, cover_w, cover_h, "public/assets/intro-cover.jpg")

    # 3. Mehendi (480x720)
    # 04 from y=1070 to 1349 (280 rows), 05 from y=50 to 50 + (720 - 280) = 490
    meh_pixels = []
    for y in range(1070, 1350):
        meh_pixels.append([get_pixel(bmp4, x, y) for x in range(386, 386 + 480)])
    for y in range(50, 50 + (720 - 280)):
        meh_pixels.append([get_pixel(bmp5, x, y) for x in range(386, 386 + 480)])
    save_top_down_bmp(meh_pixels, 480, 720, "public/assets/ev-mehendi.jpg")

    # 4. Engagement (480x720)
    eng_pixels = [[get_pixel(bmp5, x, y) for x in range(386, 386 + 480)] for y in range(465, 465 + 720)]
    save_top_down_bmp(eng_pixels, 480, 720, "public/assets/ev-engagement.jpg")

    # 5. Haldi (480x720)
    haldi_pixels = [[get_pixel(bmp6, x, y) for x in range(386, 386 + 480)] for y in range(175, 175 + 720)]
    save_top_down_bmp(haldi_pixels, 480, 720, "public/assets/ev-haldi.jpg")

    # 6. Wedding (480x720)
    # 06 from y=792 to 1350 (558 rows), 07 from y=50 to 50 + (720 - 558) = 212
    wed_pixels = []
    for y in range(792, 1350):
        wed_pixels.append([get_pixel(bmp6, x, y) for x in range(386, 386 + 480)])
    for y in range(50, 50 + (720 - 558)):
        wed_pixels.append([get_pixel(bmp7, x, y) for x in range(386, 386 + 480)])
    save_top_down_bmp(wed_pixels, 480, 720, "public/assets/ev-wedding.jpg")

    # Also crop couple photos from 04
    # Photo 1 (Where it all began)
    p1 = [[get_pixel(bmp4, x, y) for x in range(384, 622)] for y in range(267, 545)]
    save_top_down_bmp(p1, len(p1[0]), len(p1), "public/assets/photo-1.jpg")

    # Photo 2 (Some moments become memories)
    p2 = [[get_pixel(bmp4, x, y) for x in range(643, 885)] for y in range(265, 548)]
    save_top_down_bmp(p2, len(p2[0]), len(p2), "public/assets/photo-2.jpg")

    # Photo 3, 4, 5: create warm romantic wedding-themed portraits
    # For now, let's create high quality variants from the illustration and photos
    p3 = [[get_pixel(bmp1, x, y) for x in range(450, 680)] for y in range(380, 640)]
    save_top_down_bmp(p3, len(p3[0]), len(p3), "public/assets/photo-3.jpg")
    
    p4 = [[get_pixel(bmp4, x, y) for x in range(643, 885)] for y in range(265, 548)]
    save_top_down_bmp(p4, len(p4[0]), len(p4), "public/assets/photo-4.jpg")

    p5 = [[get_pixel(bmp4, x, y) for x in range(384, 622)] for y in range(267, 545)]
    save_top_down_bmp(p5, len(p5[0]), len(p5), "public/assets/photo-5.jpg")

if __name__ == "__main__":
    build_all()
