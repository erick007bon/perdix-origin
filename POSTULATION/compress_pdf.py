from pypdf import PdfReader, PdfWriter
import os

input_file = "APLICANDO A CONCURSO.pdf"
output_file = "APLICANDO_A_CONCURSO_COMPRIMIDO.pdf"

try:
    reader = PdfReader(input_file)
    writer = PdfWriter()

    for page in reader.pages:
        writer.add_page(page)
    
    # Try compressing after adding to writer
    for page in writer.pages:
        page.compress_content_streams()

    # Remove metadata
    writer.add_metadata({})

    with open(output_file, "wb") as f:
        writer.write(f)
    
    orig_size = os.path.getsize(input_file) / 1024 / 1024
    new_size = os.path.getsize(output_file) / 1024 / 1024

    print(f"Compressed '{input_file}' to '{output_file}'")
    print(f"Original size: {orig_size:.2f} MB")
    print(f"New size: {new_size:.2f} MB")

except Exception as e:
    print(f"Error: {e}")
