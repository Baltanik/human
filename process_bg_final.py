#!/usr/bin/env python3
import os
import sys

try:
    from PIL import Image
except ImportError:
    print("ERROR: PIL non installato. Esegui: pip3 install Pillow")
    sys.exit(1)

images = [
    "account_audit.webp",
    "strategy_360.webp", 
    "campaign_setup.webp",
    "tracking_analytics.webp",
    "media_planning.webp",
    "data_analysis.webp",
    "cro_wireframe.webp"
]

public_dir = os.path.join(os.path.dirname(__file__), "public")
threshold = 240

results = []
results.append("🎨 Rimozione sfondo bianco dalle immagini...\n")

for img_name in images:
    img_path = os.path.join(public_dir, img_name)
    
    if not os.path.exists(img_path):
        results.append(f"⚠️  File non trovato: {img_name}")
        continue
    
    try:
        img = Image.open(img_path)
        original_mode = img.mode
        
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        data = img.getdata()
        new_data = []
        pixels_changed = 0
        
        for item in data:
            r, g, b, a = item
            if r > threshold and g > threshold and b > threshold:
                new_data.append((255, 255, 255, 0))
                pixels_changed += 1
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(img_path, 'WEBP', quality=85)
        results.append(f"✅ {img_name}: {pixels_changed} pixel resi trasparenti")
        
    except Exception as e:
        results.append(f"❌ Errore {img_name}: {e}")

results.append("\n✨ Completato!")

# Scrivi i risultati sia su stdout che su file
output = "\n".join(results)
print(output)
with open(os.path.join(os.path.dirname(__file__), "bg_removal_result.txt"), "w") as f:
    f.write(output)
