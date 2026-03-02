import urllib.request
from PIL import Image, ImageEnhance
import os

def download_and_darken(url, filename, tint_color=(5, 5, 5), base_brightness=0.45):
    # Ya descargamos directamente las imagenes, así que vamos a leer los locales que tengamos listos
    # Pero el url handle también queda si no existe
    
    if not os.path.exists(filename):
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
        
        # Subimos el factor a 0.45 para que se note BASTANTE MÁS y no se pierda.
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(base_brightness)
        
        # Colorizamos levemente (tinte suave, alpha bajo para q no oscurezca tanto)
        tint = Image.new("RGBA", img.size, tint_color + (100,))
        img = Image.alpha_composite(img, tint)
        
        # Convertimos de nuevo a RGB
        img = img.convert("RGB")
        processed_filename = f"visible_{filename}"
        img.save(processed_filename, "JPEG", quality=95)
        print(f"Saved {processed_filename}")
    except Exception as e:
        print(f"Failed to process {filename}: {e}")

if __name__ == "__main__":
    images = [
        ("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&q=80", "dna_bg.jpg", (5, 5, 20), 0.40), # DNA abstract - azulado
        ("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80", "brain_bg.jpg", (5, 10, 25), 0.45), # Brain - medical
        ("https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1920&q=80", "banana_bg.jpg", (5, 15, 5), 0.35)   # *NUEVA BANANA REAL*
    ]
    
    for url, name, color, factor in images:
        download_and_darken(url, name, color, factor)
