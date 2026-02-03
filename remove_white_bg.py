#!/usr/bin/env python3
"""
Script per rimuovere lo sfondo bianco dalle immagini WebP
Esegui: python3 remove_white_bg.py
"""
import os
from PIL import Image

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
threshold = 240  # Soglia per considerare un pixel "bianco" (0-255)

print("🎨 Rimozione sfondo bianco dalle immagini...\n")

for img_name in images:
    img_path = os.path.join(public_dir, img_name)
    
    if not os.path.exists(img_path):
        print(f"⚠️  File non trovato: {img_name}")
        continue
    
    try:
        # Apri l'immagine
        img = Image.open(img_path)
        original_mode = img.mode
        
        # Converti in RGBA se necessario
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Processa i pixel
        data = img.getdata()
        new_data = []
        pixels_changed = 0
        
        for item in data:
            r, g, b, a = item
            # Se il pixel è bianco/chiaro, rendilo trasparente
            if r > threshold and g > threshold and b > threshold:
                new_data.append((255, 255, 255, 0))
                pixels_changed += 1
            else:
                new_data.append(item)
        
        # Applica le modifiche
        img.putdata(new_data)
        
        # Salva l'immagine
        img.save(img_path, 'WEBP', quality=85)
        
        print(f"✅ {img_name}: {pixels_changed} pixel resi trasparenti")
        
    except Exception as e:
        print(f"❌ Errore processando {img_name}: {e}")

print("\n✨ Completato!")
