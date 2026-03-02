import json

file_path = 'c:/Users/Erick Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/alzheimer-ai/AlzheimerAI_Training_v2.ipynb'

with open(file_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'CELDA DE RECUPERACIÓN' in cell['source'][0]:
        cell['source'] = [
            "# 🚀 CELDA DE RECUPERACIÓN POST-ENTRENAMIENTO (Nivel 1)\n",
            "import os\n",
            "import numpy as np\n",
            "import matplotlib.pyplot as plt\n",
            "import tensorflow as tf\n",
            "from tensorflow import keras\n",
            "from tensorflow.keras.applications.efficientnet import preprocess_input\n",
            "from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc\n",
            "from sklearn.preprocessing import label_binarize\n",
            "\n",
            "model_path = 'alzheimer_model_best.keras'\n",
            "if os.path.exists(model_path):\n",
            "    best_model = keras.models.load_model(model_path)\n",
            "    print(f\"✅ ¡Modelo recuperado con éxito desde: {model_path}!\")\n",
            "else:\n",
            "    print(f\"❌ ERROR: No se encuentra '{model_path}'.\")\n",
            "    print(\"Si tu desconexión borró el archivo en el entorno remoto, lamentablemente tendrás que volver a ejecutar el entrenamiento (Paso 6 y 7).\")\n",
            "\n",
            "# Regenerar val_ds y val_ds_processed (se necesitan para evaluar y graficar)\n",
            "import kagglehub\n",
            "from pathlib import Path\n",
            "dataset_path = kagglehub.dataset_download(\"sachinkumar413/alzheimer-mri-dataset\")\n",
            "search_root = Path(dataset_path)\n",
            "data_dir = None\n",
            "for candidate in [search_root] + list(search_root.rglob('*')):\n",
            "    if candidate.is_dir() and any('Demented' in d.name for d in candidate.iterdir() if d.is_dir()):\n",
            "        data_dir = candidate; break\n",
            "\n",
            "if data_dir is not None:\n",
            "    IMG_SIZE = 224; BATCH_SIZE = 32; SEED = 42\n",
            "    val_ds = tf.keras.utils.image_dataset_from_directory(data_dir, validation_split=0.2, subset=\"validation\", seed=SEED, image_size=(IMG_SIZE,IMG_SIZE), batch_size=BATCH_SIZE, label_mode='categorical', shuffle=False)\n",
            "    def apply_preprocessing(images, labels):\n",
            "        return preprocess_input(images), labels\n",
            "    AUTOTUNE = tf.data.AUTOTUNE\n",
            "    val_ds_processed = val_ds.map(apply_preprocessing, num_parallel_calls=AUTOTUNE).prefetch(AUTOTUNE)\n",
            "    detected_classes = val_ds.class_names\n",
            "    class_names_es = ['Deterioro Leve', 'Deterioro Moderado', 'Sano', 'Deterioro Muy Leve']\n",
            "    print(\"\\n📊 Todo listo para continuar con la Evaluación, Matriz de Confusión y Grad-CAM.\")\n",
            "else:\n",
            "    print(\"❌ No se encontró la carpeta del dataset.\")\n"
        ]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)
