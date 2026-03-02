"""Generate MedGemma Alzheimer MRI Analysis notebook."""
import json

cells = []

def md(src):
    lines = src.strip().split('\n')
    cells.append({"cell_type":"markdown","metadata":{},"source":[l+'\n' for l in lines]})

def code(src):
    lines = src.strip().split('\n')
    cells.append({"cell_type":"code","metadata":{},"source":[l+'\n' for l in lines],"outputs":[],"execution_count":None})

# ============================================================
# CELL 1: Title
# ============================================================
md("""# 🧠🔬 MedGemma × AlzheimerAI — Nivel 3: Interpretación Inteligente de MRI
**Perdix Vision** | Hult Prize 2026 — SDG 3: Good Health & Wellbeing

## ¿Qué hace este notebook?
- Usa **MedGemma 4B** (Google) para **analizar y describir** imágenes MRI de cerebros
- Genera **reportes médicos en español** automáticamente
- Identifica **atrofia del hipocampo**, ensanchamiento ventricular, cambios corticales
- Combina con la **clasificación de EfficientNetB0** (Nivel 1) para un diagnóstico completo

## Requisitos
- Google Colab con **T4 GPU** (gratis)
- Cuenta de HuggingFace (para acceder a MedGemma)
- Token de HuggingFace con acceso a `google/medgemma-4b-it`

> ⚠️ **Importante**: MedGemma requiere aceptar la licencia en [huggingface.co/google/medgemma-4b-it](https://huggingface.co/google/medgemma-4b-it) antes de usarlo.""")

# ============================================================
# CELL 2: Install
# ============================================================
code("""# Step 0: Instalación
!pip install -q transformers accelerate bitsandbytes
!pip install -q kagglehub pillow matplotlib seaborn
!pip install -q huggingface_hub
print("✅ Dependencias instaladas")
print("⚠️ IMPORTANTE: Si es la primera vez que instalas, reinicia el entorno (Entorno de ejecución -> Reiniciar entorno) para activar la GPU.")""")

# ============================================================
# CELL 3: HF Login
# ============================================================
code("""# Step 1: Login en HuggingFace
# Necesitas un token de HuggingFace: https://huggingface.co/settings/tokens
# Asegúrate de haber aceptado la licencia de MedGemma en:
# https://huggingface.co/google/medgemma-4b-it

from huggingface_hub import login
login()  # Te pedirá tu token
print("✅ Logged in to HuggingFace")""")

# ============================================================
# CELL 4: Download Dataset
# ============================================================
code("""# Step 2: Descargar Dataset de Alzheimer MRI
import os, kagglehub
from pathlib import Path

print("📥 Descargando dataset de Alzheimer MRI...")
dataset_path = kagglehub.dataset_download("sachinkumar413/alzheimer-mri-dataset")
print(f"✅ Dataset en: {dataset_path}")

# Encontrar carpeta con clases
data_dir = None
for candidate in [Path(dataset_path)] + list(Path(dataset_path).rglob('*')):
    if candidate.is_dir():
        subdirs = [d.name for d in candidate.iterdir() if d.is_dir()]
        if any('Demented' in s for s in subdirs) and len([s for s in subdirs if 'Demented' in s or 'Non' in s]) >= 3:
            data_dir = candidate
            break

if data_dir is None:
    raise FileNotFoundError(f"No se encontraron las clases en {dataset_path}")

print(f"📂 Clases encontradas en: {data_dir}")
for d in sorted(data_dir.iterdir()):
    if d.is_dir():
        imgs = list(d.glob('*.jpg')) + list(d.glob('*.png')) + list(d.glob('*.jpeg'))
        print(f"   {'🔴' if len(imgs)<100 else '🟡' if len(imgs)<500 else '🟢'} {d.name}: {len(imgs)} imágenes")""")

# ============================================================
# CELL 5: Load MedGemma
# ============================================================
code("""# Step 3: Cargar MedGemma 4B - VERSIÓN COMPATIBLE PRO (CON FIX GPU)
import torch
from transformers import AutoProcessor, AutoModelForImageTextToText, BitsAndBytesConfig

# 1. VERIFICACIÓN CRÍTICA DE GPU
if not torch.cuda.is_available():
    print("❌ ERROR: ¡No hay GPU detectada!")
    print("Para arreglarlo: Ve a 'Entorno de ejecución' -> 'Cambiar tipo de entorno' -> selecciona 'T4 GPU'.")
    print("Luego reinicia el entorno.")
else:
    print(f"✅ GPU detectada: {torch.cuda.get_device_name(0)}")

model_id = "google/medgemma-4b-it"

# Configuración oficial de 4-bit
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)

print("🔄 Cargando MedGemma 4B (Configuración Robusta en GPU)...")

model = AutoModelForImageTextToText.from_pretrained(
    model_id,
    quantization_config=quantization_config,
    device_map="auto",
    trust_remote_code=True
)
processor = AutoProcessor.from_pretrained(model_id, use_fast=False) # Fix para el warning de Gemma3

# Verificar donde quedó el modelo
final_device = next(model.parameters()).device
print(f"✅ MedGemma 4B listo y comprimido en: {final_device}")

if "cpu" in str(final_device):
    print("⚠️ ADVERTENCIA: El modelo se cargó en CPU. Será muy lento.")
    print("Causa probable: Falta reiniciar el entorno tras instalar bitsandbytes.")
""")

# ============================================================
# CELL 6: Analysis Function
# ============================================================
code("""# Step 4: Función de Análisis MRI
from PIL import Image
import numpy as np

CLASS_LABELS_ES = {
    'MildDemented': 'Deterioro Cognitivo Leve',
    'ModerateDemented': 'Deterioro Cognitivo Moderado',
    'NonDemented': 'Sin Deterioro (Sano)',
    'VeryMildDemented': 'Deterioro Cognitivo Muy Leve'
}

def analyze_mri(image_path, question=None, language="es"):
    \"\"\"Analiza una imagen MRI con MedGemma.\"\"\"
    img = Image.open(image_path).convert("RGB")

    if question is None:
        if language == "es":
            question = (
                "Analyze this brain MRI scan in detail. "
                "Describe: 1) Hippocampal volume and symmetry, "
                "2) Ventricular size and any enlargement, "
                "3) Cortical thickness and sulcal widening, "
                "4) Any signs of atrophy or neurodegeneration, "
                "5) Overall assessment for Alzheimer's disease staging. "
                "Provide your response in Spanish."
            )
        else:
            question = (
                "Analyze this brain MRI scan in detail. "
                "Describe hippocampal volume, ventricular size, "
                "cortical thickness, and any signs of neurodegeneration. "
                "Assess for Alzheimer's disease staging."
            )

    messages = [
        {
            "role": "system",
            "content": [{"type": "text", "text":
                "You are an expert neurologist and neuroradiologist specializing in "
                "Alzheimer's disease detection from brain MRI scans. You have 20 years "
                "of experience analyzing structural brain changes associated with "
                "neurodegenerative diseases. Provide detailed, clinical assessments."}]
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": question},
                {"type": "image", "image": img}
            ]
        }
    ]

    inputs = processor.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=True,
        return_dict=True,
        return_tensors="pt"
    ).to(model.device, dtype=torch.float16)

    input_len = inputs["input_ids"].shape[-1]

    with torch.inference_mode():
        generation = model.generate(
            **inputs,
            max_new_tokens=800,
            do_sample=False
        )
    generation = generation[0][input_len:]
    report = processor.decode(generation, skip_special_tokens=True)
    return report, img

print("✅ Función analyze_mri() lista")""")

# ============================================================
# CELL 7: Analyze samples
# ============================================================
code("""# Step 5: Analizar MRIs de cada clase
import matplotlib.pyplot as plt
from pathlib import Path

fig, axes = plt.subplots(2, 2, figsize=(16, 16))
fig.suptitle('🧠 MedGemma: Análisis de MRI por Etapa de Alzheimer',
             fontsize=18, fontweight='bold', y=0.98)

class_dirs = sorted([d for d in data_dir.iterdir() if d.is_dir()])
reports = {}

for idx, class_dir in enumerate(class_dirs[:4]):
    ax = axes[idx // 2, idx % 2]
    class_name = class_dir.name
    label_es = CLASS_LABELS_ES.get(class_name, class_name)

    # Tomar primera imagen de la clase
    imgs = sorted(list(class_dir.glob('*.jpg')) + list(class_dir.glob('*.png')))
    if not imgs:
        continue
    img_path = imgs[0]

    print(f"\\n🔬 Analizando: {label_es}...")
    print(f"   Imagen: {img_path.name}")

    report, img = analyze_mri(str(img_path))
    reports[class_name] = report

    ax.imshow(img)
    ax.set_title(f'{label_es}', fontsize=14, fontweight='bold',
                 color='#ef4444' if 'Moderate' in class_name
                 else '#f97316' if 'Mild' == class_name[:4]
                 else '#eab308' if 'Very' in class_name
                 else '#22c55e')
    ax.axis('off')

    # Mostrar primeras líneas del reporte
    short = report[:150].replace('\\n', ' ')
    ax.text(0.5, -0.05, f'"{short}..."',
            transform=ax.transAxes, fontsize=8, ha='center',
            style='italic', wrap=True)

plt.tight_layout()
plt.savefig('medgemma_analysis_grid.png', dpi=150, bbox_inches='tight')
plt.show()
print("\\n✅ Análisis de las 4 clases completado")""")

# ============================================================
# CELL 8: Print full reports
# ============================================================
code("""# Step 6: Reportes Completos por Clase
for class_name, report in reports.items():
    label_es = CLASS_LABELS_ES.get(class_name, class_name)
    print(f"\\n{'='*70}")
    print(f"📋 REPORTE: {label_es}")
    print(f"{'='*70}")
    print(report)
    print()""")

# ============================================================
# CELL 9: Interactive analysis
# ============================================================
code("""# Step 7: Análisis Interactivo — Pregunta lo que quieras sobre un MRI
# Elige una imagen para analizar
import random

all_images = []
for class_dir in data_dir.iterdir():
    if class_dir.is_dir():
        for img in class_dir.glob('*.jpg'):
            all_images.append((img, class_dir.name))

# Seleccionar imagen aleatoria
sample_path, sample_class = random.choice(all_images)
print(f"🎯 Imagen seleccionada: {sample_path.name}")
print(f"   Clase real: {CLASS_LABELS_ES.get(sample_class, sample_class)}")

# Pregunta personalizada
custom_question = (
    "Look at this brain MRI carefully. "
    "Is there evidence of Alzheimer's disease? "
    "If yes, what stage would you estimate? "
    "What specific anatomical changes do you observe? "
    "What would you recommend as next steps for the patient? "
    "Please respond in Spanish."
)

print("\\n🔬 Analizando con pregunta personalizada...")
report, img = analyze_mri(str(sample_path), question=custom_question)

plt.figure(figsize=(8, 8))
plt.imshow(img)
plt.title(f'Clase Real: {CLASS_LABELS_ES.get(sample_class, sample_class)}',
          fontsize=14, fontweight='bold')
plt.axis('off')
plt.show()

print(f"\\n📋 Reporte MedGemma:")
print(report)""")

# ============================================================
# CELL 10: Batch analysis
# ============================================================
code("""# Step 8: Análisis en lote — Comparar descripciones entre clases
import random

print("🔬 Análisis comparativo: ¿Cómo describe MedGemma cada etapa?\\n")

comparison_question = (
    "Describe this brain MRI in exactly 3 sentences. "
    "Focus on: hippocampus size, ventricle enlargement, and cortical thickness. "
    "Respond in Spanish."
)

comparison_results = []
for class_dir in sorted(data_dir.iterdir()):
    if not class_dir.is_dir():
        continue
    imgs = list(class_dir.glob('*.jpg'))
    if not imgs:
        continue

    # Analizar 2 imágenes por clase
    for img_path in random.sample(imgs, min(2, len(imgs))):
        print(f"  Analizando {class_dir.name}/{img_path.name}...")
        report, _ = analyze_mri(str(img_path), question=comparison_question)
        comparison_results.append({
            'class': class_dir.name,
            'class_es': CLASS_LABELS_ES.get(class_dir.name, class_dir.name),
            'image': img_path.name,
            'report': report
        })

print("\\n📊 Resultados comparativos:")
for r in comparison_results:
    print(f"\\n🏷️ {r['class_es']} ({r['image']}):")
    print(f"   {r['report'][:200]}")""")

# ============================================================
# CELL 11: Combined pipeline
# ============================================================
code("""# Step 9: Pipeline Combinado — EfficientNetB0 + MedGemma
# Si ya tienes el modelo de Nivel 1 entrenado, cárgalo aquí

import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.utils import load_img, img_to_array

def full_alzheimer_analysis(image_path, classification_model=None):
    \"\"\"Pipeline completo: Clasificación + Interpretación.\"\"\"
    print(f"\\n{'='*60}")
    print(f"🧠 ANÁLISIS COMPLETO DE ALZHEIMER")
    print(f"{'='*60}")
    print(f"📁 Imagen: {image_path}")

    # === NIVEL 1: Clasificación con EfficientNetB0 ===
    if classification_model is not None:
        print("\\n📊 NIVEL 1: Clasificación (EfficientNetB0)")
        img_arr = img_to_array(load_img(image_path, target_size=(224, 224)))
        img_arr = np.expand_dims(preprocess_input(img_arr), axis=0)
        pred = classification_model.predict(img_arr, verbose=0)
        classes = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']
        pred_class = classes[np.argmax(pred[0])]
        confidence = pred[0][np.argmax(pred[0])]

        print(f"   🏷️ Clasificación: {CLASS_LABELS_ES.get(pred_class, pred_class)}")
        print(f"   📈 Confianza: {confidence:.1%}")
        for i, c in enumerate(classes):
            bar = '█' * int(pred[0][i] * 30)
            print(f"      {CLASS_LABELS_ES.get(c, c):30s} {pred[0][i]:6.1%} {bar}")
    else:
        print("\\n⚠️ Modelo EfficientNetB0 no cargado — saltando Nivel 1")
        pred_class = "unknown"

    # === NIVEL 3: Interpretación con MedGemma ===
    print("\\n🔬 NIVEL 3: Interpretación (MedGemma 4B)")
    context = f"The classification model predicted: {pred_class}" if classification_model else ""
    question = (
        f"Analyze this brain MRI scan for signs of Alzheimer's disease. "
        f"{context} "
        f"Provide: 1) Detailed anatomical findings, "
        f"2) Assessment of disease stage, "
        f"3) Clinical recommendations. "
        f"Respond in Spanish with professional medical terminology."
    )
    report, img = analyze_mri(image_path, question=question)
    print(f"\\n📋 Reporte MedGemma:")
    print(report)

    # === Visualización ===
    plt.figure(figsize=(10, 8))
    plt.imshow(img)
    title = f"AlzheimerAI — Análisis Completo"
    if classification_model:
        title += f"\\n{CLASS_LABELS_ES.get(pred_class, pred_class)} ({confidence:.1%})"
    plt.title(title, fontsize=14, fontweight='bold')
    plt.axis('off')
    plt.tight_layout()
    plt.show()

    return {'classification': pred_class, 'report': report}

# Demo sin modelo EfficientNetB0 (puedes cargarlo si ya lo entrenaste)
sample_img = str(list(data_dir.rglob('*.jpg'))[0])
result = full_alzheimer_analysis(sample_img)""")

# ============================================================
# CELL 12: Load trained model
# ============================================================
code("""# Step 10: (Opcional) Cargar modelo EfficientNetB0 entrenado
# Descomenta si ya tienes el modelo guardado de AlzheimerAI_Training_v2.ipynb

# from tensorflow import keras
# efficientnet_model = keras.models.load_model('alzheimer_model_best.keras')
# print("✅ EfficientNetB0 cargado")
#
# # Ahora puedes usar el pipeline completo:
# result = full_alzheimer_analysis(sample_img, classification_model=efficientnet_model)""")

# ============================================================
# CELL 13: Summary
# ============================================================
code("""# Step 11: Resumen del Proyecto
print(\"\"\"
╔══════════════════════════════════════════════════════╗
║  🧠 AlzheimerAI — Perdix Vision 2026                ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  ✅ Nivel 1: EfficientNetB0 — Clasificación MRI     ║
║  ✅ Nivel 2: AlphaGenome — Riesgo Genético          ║
║  ✅ Nivel 3: MedGemma 4B — Interpretación MRI       ║
║  🔜 Nivel 4: Predicción Clínica (74K registros)     ║
║                                                      ║
║  "75% de los pacientes con Alzheimer no son          ║
║   diagnosticados a tiempo. Nosotros cambiamos eso." ║
║                                                      ║
║  🧬 La detección temprana le da TIEMPO a            ║
║     las familias. — Perdix Vision 2026               ║
╚══════════════════════════════════════════════════════╝
\"\"\")""")

# Build notebook
nb = {
    "nbformat": 4,
    "nbformat_minor": 5,
    "metadata": {
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python", "version": "3.10.0"},
        "colab": {"provenance": [], "gpuType": "T4"},
        "accelerator": "GPU"
    },
    "cells": cells
}

path = r'c:\Users\Erick Zambrano\Desktop\linkedin\PROYECTOS\ingenieria-platform\alzheimer-ai\MedGemma_Alzheimer_Analysis.ipynb'
with open(path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print(f"✅ Notebook: {path}")
print(f"   {len(cells)} cells ({sum(1 for c in cells if c['cell_type']=='markdown')} md + {sum(1 for c in cells if c['cell_type']=='code')} code)")
