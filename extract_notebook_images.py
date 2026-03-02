import json
import base64
import os

notebook_path = "alzheimer-ai/AlzheimerAI_Training_v2.ipynb"
output_dir = "public/alzheimer-assets"
os.makedirs(output_dir, exist_ok=True)

try:
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)
    
    image_count = 0
    saved_files = []
    
    # Target specific output keywords in the cells to map them correctly (heuristics)
    # The last images generated usually are: History, Matrix, ROC, GradCAM
    for cell_idx, cell in enumerate(nb.get("cells", [])):
        if cell.get("cell_type") == "code":
            for out_idx, output in enumerate(cell.get("outputs", [])):
                if "data" in output and "image/png" in output["data"]:
                    img_data = output["data"]["image/png"]
                    
                    # Heuristics based on cell source comments
                    file_name = f"image_{cell_idx}_{out_idx}.png"
                    src = "".join(cell.get("source", [])).lower()
                    
                    if "step 10" in src or "matrix" in src:
                        file_name = "matrix_placeholder.png"
                    elif "step 11" in src or "roc" in src:
                        file_name = "roc_placeholder.png"
                    elif "step 12" in src or "grad-cam" in src or "gradcam" in src:
                        file_name = "gradcam_placeholder.png"
                    elif "history" in src or "training" in src:
                        file_name = "history.png"
                    
                    img_path = os.path.join(output_dir, file_name)
                    
                    with open(img_path, "wb") as img_file:
                        img_file.write(base64.b64decode(img_data))
                    saved_files.append(img_path)
                    image_count += 1
                    print(f"✅ Saved extracted image to {img_path}")

    print(f"🎉 Successfully extracted {image_count} images from the notebook.")
except Exception as e:
    print(f"❌ Error: {e}")
