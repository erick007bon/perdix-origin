"""Generate AlzheimerAI Clinical Prediction notebook."""
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
md("""# 📊📋 AlzheimerAI — Nivel 4: Predicción por Datos Clínicos y Hábitos
**Perdix Vision** | Hult Prize 2026 — SDG 3: Good Health & Wellbeing

## ¿Qué hace este notebook?
- Analiza un dataset masivo de **74,300 pacientes** (HuggingFace: `ysamide/AlzheimersPrediction`).
- Entrena un modelo de Machine Learning para predecir el riesgo de Alzheimer basado en:
    - **Estilo de vida**: Dieta, ejercicio, sueño, alcohol, tabaco.
    - **Salud física**: IMC, presión arterial, colesterol.
    - **Historial médico**: Diabetes, depresión, historial familiar.
- Identifica los **factores de riesgo más críticos** para la prevención.

## Impacto
Permite realizar un **screening preventivo** sin necesidad de imágenes, identificando a personas de alto riesgo para priorizar sus MRIs y pruebas genéticas.""")

# ============================================================
# CELL 2: Install
# ============================================================
code("""# Step 0: Instalación
!pip install -q datasets pandas matplotlib seaborn scikit-learn xgboost
print("✅ Librerías instaladas")""")

# ============================================================
# CELL 3: Load Dataset
# ============================================================
code("""# Step 1: Cargar Dataset desde HuggingFace
from datasets import load_dataset
import pandas as pd

print("📥 Cargando dataset 'ysamide/AlzheimersPrediction'...")
dataset = load_dataset("ysamide/AlzheimersPrediction", split="train")
df = pd.DataFrame(dataset)

print(f"✅ Dataset cargado: {df.shape[0]} registros y {df.shape[1]} columnas")
print("\\nColumnas disponibles:")
print(df.columns.tolist())""")

# ============================================================
# CELL 4: Preview and Basic Cleaning
# ============================================================
code("""# Step 2: Previsualización y Limpieza
# Ver las primeras filas
display(df.head())

# Verificar nulos
print("\\n🔍 Valores nulos por columna:")
print(df.isnull().sum().sum())

# Estadísticas básicas
print("\\n📊 Resumen estadístico:")
display(df.describe())""")

# ============================================================
# CELL 5: EDA - Correlation
# ============================================================
code("""# Step 3: Análisis Exploratorio (EDA)
import matplotlib.pyplot as plt
import seaborn as sns

# Distribución del diagnóstico
plt.figure(figsize=(8, 5))
sns.countplot(x='Diagnosis', data=df, palette='viridis')
plt.title('Distribución de Diagnósticos (0: Sano, 1: Alzheimer)')
plt.show()

# Correlación con el diagnóstico
plt.figure(figsize=(10, 15))
correlations = df.corr()['Diagnosis'].sort_values(ascending=False)
sns.barplot(x=correlations.values, y=correlations.index, palette='coolwarm')
plt.title('Correlación de Factores con el Diagnóstico de Alzheimer')
plt.grid(axis='x', alpha=0.3)
plt.show()""")

# ============================================================
# CELL 6: EDA - Key factors
# ============================================================
code("""# Step 3.5: Visualización de Factores Críticos
fig, axes = plt.subplots(2, 2, figsize=(16, 12))

# 1. Edad vs Diagnóstico
sns.histplot(data=df, x='Age', hue='Diagnosis', multiple='stack', ax=axes[0,0], palette='magma')
axes[0,0].set_title('Edad y Diagnóstico')

# 2. Historial Familiar
sns.countplot(data=df, x='FamilyHistoryAlzheimers', hue='Diagnosis', ax=axes[0,1], palette='Set2')
axes[0,1].set_title('Impacto del Historial Familiar')

# 3. Calidad del Sueño (1-10)
sns.boxplot(data=df, x='Diagnosis', y='SleepQuality', ax=axes[1,0], palette='coolwarm')
axes[1,0].set_title('Calidad del Sueño vs Alzheimer')

# 4. Actividad Física (horas/semana)
sns.violinplot(data=df, x='Diagnosis', y='PhysicalActivity', ax=axes[1,1], palette='viridis')
axes[1,1].set_title('Horas de Ejercicio Semanal')

plt.tight_layout()
plt.show()""")

# ============================================================
# CELL 7: Preprocessing
# ============================================================
code("""# Step 4: Preprocesamiento
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Identificar columnas categóricas (si las hay, aparte de Diagnosis)
cat_cols = df.select_dtypes(include=['object']).columns
for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

# Separar X e y
X = df.drop(['Diagnosis', 'PatientID'], axis=1, errors='ignore')
y = df['Diagnosis']

# Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Escalado de datos
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"✅ Datos preparados: {X_train.shape[0]} train, {X_test.shape[0]} test")""")

# ============================================================
# CELL 8: Model Training (XGBoost)
# ============================================================
code("""# Step 5: Entrenamiento del Modelo (XGBoost)
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, accuracy_score

print("🚀 Entrenando XGBoost...")
model = XGBClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    use_label_encoder=False,
    eval_metric='logloss'
)

model.fit(X_train_scaled, y_train)

# Predicciones
y_pred = model.predict(X_test_scaled)
y_prob = model.predict_proba(X_test_scaled)[:, 1]

print(f"✅ Entrenamiento completado")
print(f"📈 Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"🧪 ROC-AUC: {roc_auc_score(y_test, y_prob):.4f}")""")

# ============================================================
# CELL 9: Evaluation
# ============================================================
code("""# Step 6: Evaluación Detallada
print("\\n📋 Reporte de Clasificación:")
print(classification_report(y_test, y_pred))

# Matriz de Confusión
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicción')
plt.ylabel('Real')
plt.title('Matriz de Confusión')
plt.show()""")

# ============================================================
# CELL 10: Feature Importance (THE BIG PITCH!)
# ============================================================
code("""# Step 7: ¿Qué es lo que más importa? (Importancia de Características)
feature_importances = pd.DataFrame({
    'Factor': X.columns,
    'Importancia': model.feature_importances_
}).sort_values(ascending=False, by='Importancia')

plt.figure(figsize=(10, 12))
sns.barplot(x='Importancia', y='Factor', data=feature_importances.head(20), palette='viridis')
plt.title('Top 20 Factores de Riesgo más Críticos (según la IA)')
plt.grid(axis='x', alpha=0.3)
plt.show()

print("\\n🏆 Los 5 factores más determinantes:")
for i, row in feature_importances.head(5).iterrows():
    print(f"   {i+1}. {row['Factor']}: {row['Importancia']:.4f}")""")

# ============================================================
# CELL 11: Prediction Function
# ============================================================
code("""# Step 8: Predicción Interactiva para un Paciente
def predict_risk(patient_data):
    \"\"\" patient_data: dict con las columnas del modelo \"\"\"
    input_df = pd.DataFrame([patient_data])
    input_scaled = scaler.transform(input_df)
    prob = model.predict_proba(input_scaled)[0][1]
    
    print(f"\\n{'='*50}")
    print(f"🏥 RESULTADO DEL SCREENING CLÍNICO")
    print(f"{'='*50}")
    print(f"Riesgo estimado de Alzheimer: {prob:.1%}")
    
    if prob > 0.7:
        print("🔴 ALTO RIESGO: Se recomienda priorizar MRI y consulta neurológica.")
    elif prob > 0.3:
        print("🟡 RIESGO MODERADO: Monitoreo preventivo y mejora de hábitos.")
    else:
        print("🟢 RIESGO BAJO: Continuar con estilo de vida saludable.")
    print(f"{'='*50}")

# Ejemplo de uso
sample_patient = X_test.iloc[0].to_dict()
predict_risk(sample_patient)""")

# ============================================================
# CELL 12: Saving Model
# ============================================================
code("""# Step 9: Guardar Modelo
import pickle
with open('clinical_risk_model.pkl', 'wb') as f:
    pickle.dump({'model': model, 'scaler': scaler, 'features': X.columns.tolist()}, f)
print("✅ Modelo clínico guardado como 'clinical_risk_model.pkl'")""")

# ============================================================
# CELL 13: Summary
# ============================================================
code("""# Step 10: Perdix Vision — Ecosistema Completo
print(\"\"\"
╔══════════════════════════════════════════════════════╗
║  🧬 AlzheimerAI — Nivel 4: Predicción Clínica       ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  ✅ Analizados 74,300 casos clínicos.                ║
║  ✅ Identificados factores de estilo de vida clave.  ║
║                                                      ║
║  Este nivel permite que el paciente reciba una       ║
║  alerta PREVENTIVA basada solo en sus hábitos,       ║
║  mucho antes de necesitar un costoso MRI.            ║
║                                                      ║
║  "La prevención es el único tratamiento efectivo     ║
║   que tenemos hoy contra el Alzheimer."              ║
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

path = r'c:\Users\Erick Zambrano\Desktop\linkedin\PROYECTOS\ingenieria-platform\alzheimer-ai\AlzheimerAI_Clinical_Prediction.ipynb'
with open(path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print(f"✅ Notebook: {path}")
print(f"   {len(cells)} cells ({sum(1 for c in cells if c['cell_type']=='markdown')} md + {sum(1 for c in cells if c['cell_type']=='code')} code)")
