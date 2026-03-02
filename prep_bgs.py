import urllib.request
from PIL import Image, ImageEnhance
import os

def download_and_darken(url, filename, tint_color=(10, 10, 15), darkness_factor=0.2):
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return

    print(f"Processing {filename}...")
    try:
        img = Image.open(filename).convert("RGBA")
        
        # Darken image
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(darkness_factor)
        
        # Add tint
        tint = Image.new("RGBA", img.size, tint_color + (180,))
        img = Image.alpha_composite(img, tint)
        
        # Convert back to RGB and save
        img = img.convert("RGB")
        processed_filename = f"dark_{filename}"
        img.save(processed_filename, "JPEG", quality=90)
        print(f"Saved {processed_filename}")
    except Exception as e:
        print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    images = [
        ("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&q=80", "dna_bg.jpg", (5, 5, 20), 0.3), # DNA abstract
        ("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80", "brain_bg.jpg", (5, 10, 25), 0.25), # Brain / Medical
        ("https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1920&q=80", "leaf_bg.jpg", (5, 15, 5), 0.2)   # Banana leaf
    ]
    
    for url, name, color, factor in images:
        download_and_darken(url, name, color, factor)
