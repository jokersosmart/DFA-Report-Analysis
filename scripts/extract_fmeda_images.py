#!/usr/bin/env python3
"""提取 FMEDA Excel 中的所有嵌入圖片"""
import openpyxl
import os

EXCEL_PATH = "/home/ubuntu/upload/RD-03-008-01FMEDAReport.xlsx"
OUTPUT_DIR = "/home/ubuntu/fmeda_extracted_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(EXCEL_PATH)

for sheet_name in wb.sheetnames:
    ws = wb[sheet_name]
    if ws._images:
        for idx, img in enumerate(ws._images):
            # Determine extension from image format
            fmt = getattr(img, 'format', None)
            if fmt:
                ext = fmt.lower()
            else:
                # Try to detect from the image data
                data = img._data()
                if data[:4] == b'\x89PNG':
                    ext = 'png'
                elif data[:2] == b'\xff\xd8':
                    ext = 'jpg'
                else:
                    ext = 'bin'
            
            safe_name = sheet_name.replace(' ', '_').replace('/', '_').replace('.', '_')
            filename = f"{safe_name}_img{idx}.{ext}"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            with open(filepath, 'wb') as f:
                f.write(img._data())
            
            try:
                w, h = img.width, img.height
            except:
                w, h = '?', '?'
            print(f"Saved: {filename} ({w}x{h})")

print(f"\nDone! Total images extracted to {OUTPUT_DIR}")
