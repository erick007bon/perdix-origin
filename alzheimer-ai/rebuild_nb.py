import json

file_path = 'c:/Users/Erick Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/alzheimer-ai/AlzheimerAI_Training_v2.ipynb'

with open(file_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Find and fix imports
import_cell_idx = -1
for i, cell in enumerate(nb['cells']):
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Step 2: Imports' in cell['source'][0]:
        import_cell_idx = i
        break

if import_cell_idx != -1:
    source = [
        "# Step 2: Imports & Config\n",
        "import numpy as np\n",
        "import matplotlib.pyplot as plt\n",
        "import seaborn as sns\n",
        "import os\n",
        "from pathlib import Path\n",
        "import warnings; warnings.filterwarnings('ignore')\n",
        "\n",
        "import tensorflow as tf\n",
        "from tensorflow import keras\n",
        "from tensorflow.keras import layers, models, callbacks, optimizers\n",
        "from tensorflow.keras.applications import EfficientNetB0\n",
        "from tensorflow.keras.applications.efficientnet import preprocess_input\n",
        "from tensorflow.keras.utils import load_img, img_to_array\n",
        "from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc\n",
        "from sklearn.preprocessing import label_binarize\n",
        "from sklearn.utils.class_weight import compute_class_weight\n",
        "\n",
        "IMG_SIZE = 224; BATCH_SIZE = 32\n",
        "EPOCHS_PHASE1 = 15; EPOCHS_PHASE2 = 20\n",
        "LEARNING_RATE = 1e-3; FINE_TUNE_LR = 1e-4; SEED = 42\n",
        "\n",
        "CLASS_NAMES = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']\n",
        "CLASS_LABELS_ES = {'MildDemented':'Deterioro Leve','ModerateDemented':'Deterioro Moderado',\\\n",
        "    'NonDemented':'Sano (No Demencia)','VeryMildDemented':'Deterioro Muy Leve',\n",
        "    'Mild_Demented':'Deterioro Leve','Moderate_Demented':'Deterioro Moderado',\n",
        "    'Non_Demented':'Sano (No Demencia)','Very_Mild_Demented':'Deterioro Muy Leve'}\n",
        "\n",
        "tf.random.set_seed(SEED); np.random.seed(SEED)\n",
        "try:\n",
        "    if tf.config.list_physical_devices('GPU'):\n",
        "        tf.keras.mixed_precision.set_global_policy('mixed_float16')\n",
        "        print(\"⚡ Mixed precision ON\")\n",
        "except: pass\n",
        "print(f\"TF: {tf.__version__} | GPU: {tf.config.list_physical_devices('GPU')}\")\n"
    ]
    nb['cells'][import_cell_idx]['source'] = source

# Remove recovery cells
new_cells = []
for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and ('CELDA DE RECUPERACIÓN' in cell['source'][0] or 'Re-generar' in cell['source'][0]):
        continue
    new_cells.append(cell)

nb['cells'] = new_cells

# Fix History cell
for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Training History' in cell['source'][0]:
        cell['source'] = [
            "# Step 8: Training History\n",
            "import matplotlib.pyplot as plt\n",
            "\n",
            "if 'history_phase1' in locals() and 'history_phase2' in locals():\n",
            "    fig, axes = plt.subplots(1, 2, figsize=(14, 5))\n",
            "    \n",
            "    aa = history_phase1.history['accuracy'] + history_phase2.history['accuracy']\n",
            "    va = history_phase1.history['val_accuracy'] + history_phase2.history['val_accuracy']\n",
            "    al = history_phase1.history['loss'] + history_phase2.history['loss']\n",
            "    vl = history_phase1.history['val_loss'] + history_phase2.history['val_loss']\n",
            "    p1 = len(history_phase1.history['accuracy'])\n",
            "\n",
            "    axes[0].plot(aa, label='Train', lw=2, color='#38bdf8')\n",
            "    axes[0].plot(va, label='Val', lw=2, color='#818cf8')\n",
            "    axes[0].axvline(x=p1-1, color='red', ls='--', alpha=0.5, label='Fine-tune')\n",
            "    axes[0].set_title('Accuracy', fontweight='bold')\n",
            "    axes[0].legend()\n",
            "    axes[0].grid(True, alpha=0.3)\n",
            "\n",
            "    axes[1].plot(al, label='Train', lw=2, color='#38bdf8')\n",
            "    axes[1].plot(vl, label='Val', lw=2, color='#818cf8')\n",
            "    axes[1].axvline(x=p1-1, color='red', ls='--', alpha=0.5, label='Fine-tune')\n",
            "    axes[1].set_title('Loss', fontweight='bold')\n",
            "    axes[1].legend()\n",
            "    axes[1].grid(True, alpha=0.3)\n",
            "\n",
            "    plt.suptitle('🧠 AlzheimerAI v2.0 - Training History', fontsize=16, fontweight='bold', y=1.02)\n",
            "    plt.tight_layout()\n",
            "    plt.show()\n",
            "else:\n",
            "    print(\"❌ Historia no encontrada. Esto ocurre si cargaste el modelo sin entrenarlo en esta sesión.\")\n"
        ]

# Make sure Step 9 accesses detected_classes correctly and works regardless of class names
for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Step 9: Evaluation' in cell['source'][0]:
        cell['source'] = [
            "# Step 9: Evaluation\n",
            "best_model = keras.models.load_model('alzheimer_model_best.keras')\n",
            "val_loss, val_acc = best_model.evaluate(val_ds_processed, verbose=0)\n",
            "print(f\"✅ Val Accuracy: {val_acc:.4f} | Loss: {val_loss:.4f}\")\n",
            "\n",
            "y_pred_all, y_true_all = [], []\n",
            "for imgs, lbls in val_ds_processed:\n",
            "    y_pred_all.append(best_model.predict(imgs, verbose=0))\n",
            "    y_true_all.append(lbls.numpy())\n",
            "predictions = np.concatenate(y_pred_all); y_true_oh = np.concatenate(y_true_all)\n",
            "y_pred = np.argmax(predictions, axis=1); y_true = np.argmax(y_true_oh, axis=1)\n",
            "detected_classes = val_ds.class_names\n",
            "class_names_es_arr = [CLASS_LABELS_ES.get(cn, cn) for cn in detected_classes]\n",
            "\n",
            "print(\"\\n📋 Classification Report:\")\n",
            "print(classification_report(y_true, y_pred, target_names=class_names_es_arr, digits=4))\n"
        ]

for cell in nb['cells']:
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Step 10: Confusion Matrix' in cell['source'][0]:
        cell['source'] = [
            "# Step 10: Confusion Matrix\n",
            "fig, ax = plt.subplots(figsize=(10,8))\n",
            "cm = confusion_matrix(y_true, y_pred)\n",
            "ConfusionMatrixDisplay(cm, display_labels=class_names_es_arr).plot(ax=ax, cmap='Blues', values_format='d')\n",
            "ax.set_title('🧠 Confusion Matrix', fontsize=16, fontweight='bold')\n",
            "plt.xticks(rotation=25, ha='right'); plt.tight_layout(); plt.show()\n",
            "\n",
            "for i,cn in enumerate(class_names_es_arr):\n",
            "    m = y_true==i\n",
            "    if m.sum()>0:\n",
            "        a = (y_pred[m]==i).mean()\n",
            "        print(f\"  {'🟢' if a>0.8 else '🟡' if a>0.6 else '🔴'} {cn}: {a:.1%} ({m.sum()})\")\n"
        ]
        
    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Step 11: ROC Curves' in cell['source'][0]:
        cell['source'] = [
            "# Step 11: ROC Curves\n",
            "y_bin = label_binarize(y_true, classes=range(len(detected_classes)))\n",
            "fig, ax = plt.subplots(figsize=(10,8))\n",
            "for i,(c,l) in enumerate(zip(['#38bdf8','#818cf8','#34d399','#f97316'], class_names_es_arr)):\n",
            "    fpr,tpr,_ = roc_curve(y_bin[:,i], predictions[:,i])\n",
            "    ax.plot(fpr, tpr, color=c, lw=2, label=f'{l} (AUC={auc(fpr,tpr):.4f})')\n",
            "ax.plot([0,1],[0,1],'k--',alpha=0.3)\n",
            "ax.set_title('🧠 ROC Curves', fontsize=14, fontweight='bold')\n",
            "ax.legend(loc='lower right'); ax.grid(True,alpha=0.3)\n",
            "plt.tight_layout(); plt.show()\n"
        ]

    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'Step 12: Grad-CAM' in cell['source'][0]:
        cell['source'] = [
            "# Step 12: Grad-CAM\n",
            "def make_gradcam(img, model):\n",
            "    base = model.layers[1]\n",
            "    conv_name = None\n",
            "    for l in reversed(base.layers):\n",
            "        if isinstance(l, tf.keras.layers.Conv2D): conv_name = l.name; break\n",
            "    if not conv_name: return None\n",
            "    gm = tf.keras.models.Model(model.input, [base.get_layer(conv_name).output, model.output])\n",
            "    with tf.GradientTape() as tape:\n",
            "        co, pr = gm(img); cc = pr[:, tf.argmax(pr[0])]\n",
            "    g = tape.gradient(cc, co)\n",
            "    pg = tf.reduce_mean(g, axis=(0,1,2))\n",
            "    h = co[0] @ pg[...,tf.newaxis]\n",
            "    h = tf.squeeze(h); h = tf.maximum(h,0)/(tf.math.reduce_max(h)+1e-8)\n",
            "    return h.numpy()\n",
            "\n",
            "si, sl = next(iter(val_ds))\n",
            "sp = preprocess_input(si.numpy().copy())\n",
            "fig, axes = plt.subplots(2,4,figsize=(20,10))\n",
            "fig.suptitle('🧠 Grad-CAM: Where AI Looks', fontsize=18, fontweight='bold')\n",
            "for i in range(min(8,len(si))):\n",
            "    ax = axes[i//4,i%4]\n",
            "    p = best_model.predict(sp[i:i+1],verbose=0)\n",
            "    pc = np.argmax(p[0]); cf = p[0][pc]\n",
            "    try:\n",
            "        h = make_gradcam(sp[i:i+1], best_model)\n",
            "        if h is not None:\n",
            "            hr = tf.image.resize(h[...,np.newaxis],(IMG_SIZE,IMG_SIZE)).numpy().squeeze()\n",
            "            ax.imshow(si[i].numpy().astype('uint8')); ax.imshow(hr,cmap='jet',alpha=0.4)\n",
            "        else: ax.imshow(si[i].numpy().astype('uint8'))\n",
            "    except: ax.imshow(si[i].numpy().astype('uint8'))\n",
            "    tc = np.argmax(sl[i])\n",
            "    ax.set_title(f'Pred:{class_names_es_arr[pc]}\\nTrue:{class_names_es_arr[tc]}\\n{cf:.1%}',\n",
            "        fontsize=9,fontweight='bold',color='#34d399' if pc==tc else '#f85149')\n",
            "    ax.axis('off')\n",
            "plt.tight_layout(); plt.show()\n"
        ]

    if cell['cell_type'] == 'code' and len(cell['source']) > 0 and 'predict_alzheimer' in cell['source'][0]:
        cell['source'] = [
            "# Step 14: Prediction Function\n",
            "def predict_alzheimer(image_path, model=best_model):\n",
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
            "print(\"✅ predict_alzheimer() ready!\")\n"
        ]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Notebook updated correctly!")
