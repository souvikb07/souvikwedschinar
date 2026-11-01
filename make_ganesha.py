import struct, subprocess, os

def make_ganesha():
    temp = "temp_g.bmp"
    subprocess.run(["sips", "-s", "format", "bmp", "wedding-invite-brief/screenshots/03-main-scroll-1.jpg", "--out", temp], stdout=subprocess.DEVNULL)
    with open(temp, "rb") as f:
        d = f.read()
    if os.path.exists(temp): os.remove(temp)
    
    data_offset = struct.unpack_from("<I", d, 10)[0]
    w, h = struct.unpack_from("<ii", d, 18)
    stride = ((w * 3 + 3) // 4) * 4
    
    # Ganesha bounds: X(566..672), Y(71..225)
    gx, gy, gw, gh = 566, 71, 108, 156
    
    # Output 32-bit BGRA top-down BMP
    bytes_per_pixel = 4
    out_stride = gw * 4
    pixel_size = out_stride * gh
    file_size = 54 + pixel_size
    
    header = bytearray(54)
    header[0:2] = b'BM'
    struct.pack_into("<I", header, 2, file_size)
    struct.pack_into("<I", header, 10, 54)
    struct.pack_into("<I", header, 14, 40)
    struct.pack_into("<ii", header, 18, gw, -gh)
    struct.pack_into("<H", header, 26, 1)
    struct.pack_into("<H", header, 28, 32)
    struct.pack_into("<I", header, 34, pixel_size)
    
    buf = bytearray(pixel_size)
    
    for r in range(gh):
        src_y = gy + r
        row_offset = r * out_stride
        for c in range(gw):
            src_x = gx + c
            offset = data_offset + src_y * stride + src_x * 3
            sb = d[offset]
            sg = d[offset+1]
            sr = d[offset+2]
            
            # Distance from background cream #fdf5ea (253, 245, 234)
            # Maroon target is #711423 (113, 20, 35)
            # Inverted luminance / darkness measure
            luminance = 0.299 * sr + 0.587 * sg + 0.114 * sb
            bg_lum = 245.0
            dark_lum = 50.0
            
            # alpha: 0 at bg_lum, 255 at dark_lum
            if luminance >= bg_lum - 5:
                alpha = 0
            elif luminance <= dark_lum:
                alpha = 255
            else:
                alpha = int(255 * (bg_lum - luminance) / (bg_lum - dark_lum))
                
            p_offset = row_offset + c * 4
            if alpha > 0:
                # Set pure maroon #711423
                buf[p_offset] = 35     # B
                buf[p_offset+1] = 20   # G
                buf[p_offset+2] = 113  # R
                buf[p_offset+3] = alpha
            else:
                buf[p_offset] = 0
                buf[p_offset+1] = 0
                buf[p_offset+2] = 0
                buf[p_offset+3] = 0
                
    temp_out = "temp_g_out.bmp"
    with open(temp_out, "wb") as f:
        f.write(header)
        f.write(buf)
        
    subprocess.run(["sips", "-s", "format", "png", temp_out, "--out", "public/assets/ganesha-icon.png"], stdout=subprocess.DEVNULL)
    if os.path.exists(temp_out): os.remove(temp_out)
    print("Created transparent public/assets/ganesha-icon.png")

if __name__ == "__main__":
    make_ganesha()
