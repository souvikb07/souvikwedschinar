import sys
import struct
import subprocess
import os

def crop_image(src_path, dst_path, x, y, width, height):
    temp_bmp = "temp_src.bmp"
    temp_crop_bmp = "temp_crop.bmp"
    subprocess.run(["sips", "-s", "format", "bmp", src_path, "--out", temp_bmp], check=True, stdout=subprocess.DEVNULL)
    
    with open(temp_bmp, "rb") as f:
        data = f.read()
    
    data_offset = struct.unpack_from("<I", data, 10)[0]
    img_w, img_h = struct.unpack_from("<ii", data, 18)
    bpp = struct.unpack_from("<H", data, 28)[0]
    
    bytes_per_pixel = bpp // 8
    row_stride = ((img_w * bytes_per_pixel + 3) // 4) * 4
    
    is_top_down = (img_h < 0)
    actual_h = abs(img_h)
    
    crop_w = width
    crop_h = height
    crop_stride = ((crop_w * bytes_per_pixel + 3) // 4) * 4
    crop_pixel_size = crop_stride * crop_h
    file_size = 54 + crop_pixel_size
    
    # We will write a standard top-down BMP (height = -crop_h)
    header = bytearray(54)
    header[0:2] = b'BM'
    struct.pack_into("<I", header, 2, file_size)
    struct.pack_into("<I", header, 10, 54)
    struct.pack_into("<I", header, 14, 40)
    struct.pack_into("<ii", header, 18, crop_w, -crop_h) # top-down!
    struct.pack_into("<H", header, 26, 1)
    struct.pack_into("<H", header, 28, bpp)
    struct.pack_into("<I", header, 34, crop_pixel_size)
    
    pixel_data = bytearray(crop_pixel_size)
    
    for r in range(crop_h):
        # visual y
        visual_y = y + r
        if is_top_down:
            src_row = visual_y
        else:
            src_row = actual_h - 1 - visual_y
            
        src_offset = data_offset + src_row * row_stride + x * bytes_per_pixel
        dst_offset = r * crop_stride
        pixel_data[dst_offset : dst_offset + crop_w * bytes_per_pixel] = data[src_offset : src_offset + crop_w * bytes_per_pixel]
        
    with open(temp_crop_bmp, "wb") as f:
        f.write(header)
        f.write(pixel_data)
        
    ext = os.path.splitext(dst_path)[1].lower()
    fmt = "jpeg" if ext in [".jpg", ".jpeg"] else "png"
    subprocess.run(["sips", "-s", "format", fmt, temp_crop_bmp, "--out", dst_path], check=True, stdout=subprocess.DEVNULL)
    if os.path.exists(temp_bmp): os.remove(temp_bmp)
    if os.path.exists(temp_crop_bmp): os.remove(temp_crop_bmp)

if __name__ == "__main__":
    src = sys.argv[1]
    dst = sys.argv[2]
    x, y, w, h = map(int, sys.argv[3:7])
    crop_image(src, dst, x, y, w, h)
