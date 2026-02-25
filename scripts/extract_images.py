import openpyxl
from openpyxl.drawing.image import Image
import os
from io import BytesIO

EXCEL_PATH = "/home/ubuntu/upload/RD-03-009-01.ADFA報告DFAReport.xlsx"
OUTPUT_DIR = "/home/ubuntu/extracted_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(EXCEL_PATH)

for sheet_name in wb.sheetnames:
    ws = wb[sheet_name]
    images = ws._images
    if images:
        safe_name = sheet_name.replace(' ', '_').replace('/', '_').replace('.', '_')
        for idx, img in enumerate(images):
            try:
                # Get image data
                img_data = img._data()
                ext = 'png'
                # Try to detect format
                if img_data[:3] == b'\xff\xd8\xff':
                    ext = 'jpg'
                elif img_data[:4] == b'\x89PNG':
                    ext = 'png'
                elif img_data[:4] == b'GIF8':
                    ext = 'gif'
                elif img_data[:2] == b'BM':
                    ext = 'bmp'
                
                filename = f"{safe_name}_img{idx}.{ext}"
                filepath = os.path.join(OUTPUT_DIR, filename)
                with open(filepath, 'wb') as f:
                    f.write(img_data)
                print(f"Extracted: {filepath} ({len(img_data)} bytes)")
            except Exception as e:
                print(f"Error extracting image {idx} from {sheet_name}: {e}")

wb.close()
print(f"\nDone. All images saved to {OUTPUT_DIR}")
