import json

file_path = 'c:/Users/Erick Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/alzheimer-ai/AlzheimerAI_Training_v2.ipynb'

with open(file_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'predict_alzheimer' in cell['source'][0]:
        cell['source'] = [
            "# Step 14: Prediction Function\n",
            "def predict_alzheimer(image_path, model=best_model):\n",
            "    from tensorflow.keras.utils import load_img, img_to_array\n",
            "    img = load_img(image_path, target_size=(IMG_SIZE,IMG_SIZE))\n",
            "    arr = np.expand_dims(preprocess_input(img_to_array(img)), axis=0)\n",
            "    p = model.predict(arr, verbose=0)\n",
            "    pc = np.argmax(p[0]); cf = p[0][pc]\n",
            "    print(f\"🧠 Diagnosis: {class_names_es_arr[pc]} ({cf:.1%})\")\n",
            "    for i,cn in enumerate(class_names_es_arr):\n",
            "        print(f\"   {cn:25s} {p[0][i]:6.1%} {'█'*int(p[0][i]*30)}\")\n",
            "    return {'class_es':class_names_es_arr[pc],'confidence':float(cf)}\n",
            "\n",
            "# Usage: predict_alzheimer('your_mri.jpg')\n",
            "print(\"✅ predict_alzheimer() ready!\")"
        ]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Final fix applied")
