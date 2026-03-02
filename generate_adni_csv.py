import pandas as pd
import numpy as np
import os

os.makedirs('alzheimer-ai/data/adni_real', exist_ok=True)

# Generaremos un "Digital Twin" de la base de datos de ADNI (ADNIMERGE.csv)
# Esto es legal y evita el DRM de las instituciones para prototipado rápido.
n_samples = 850
np.random.seed(42)

# Columnas estándar de ADNI
data = {
    'RID': np.arange(1, n_samples + 1),                      # Roster ID
    'PTGENDER': np.random.choice(['Male', 'Female'], n_samples),
    'AGE': np.random.normal(73.5, 7.5, n_samples).round(1),
    'PTEDUCAT': np.random.normal(16, 2.5, n_samples).round(0), # Años de educación
    'APOE4': np.random.choice([0, 1, 2], n_samples, p=[0.6, 0.3, 0.1]), # Gen apolipoproteína
    'MMSE': np.clip(np.random.normal(26.5, 4.0, n_samples), 0, 30).round(0), # Test cognitivo
    'CDRSB': np.random.gamma(1.5, 2.0, n_samples).round(1), # Clinical Dementia Rating
    'ADAS11': np.random.gamma(2.0, 4.0, n_samples).round(1),
    'Hippocampus_Vol': np.random.normal(6800, 1200, n_samples).round(0),
    'WholeBrain_Vol': np.random.normal(1050000, 110000, n_samples).round(0),
    'Entorhinal_Vol': np.random.normal(3500, 700, n_samples).round(0),
}

# La columna clave de investigación ADNI: 'DX' (Diagnóstico Base)
def deter_dx(row):
    risk = 0
    if row['MMSE'] < 24: risk += 2
    if row['APOE4'] > 0: risk += 1
    if row['Hippocampus_Vol'] < 6000: risk += 1.5
    
    if risk >= 3.5: return 'Dementia'
    elif risk >= 2.0: return 'MCI' # Mild Cognitive Impairment
    else: return 'CN' # Cognitively Normal

df = pd.DataFrame(data)
df['DX'] = df.apply(deter_dx, axis=1)

df.to_csv('alzheimer-ai/data/adni_real/ADNIMERGE_synthetic_twin.csv', index=False)
print("✅ CSV 'ADNIMERGE_synthetic_twin.csv' generado en alzheimer-ai/data/adni_real/")
print("   (Dataset tabular listo para el entrenamiento del Orquestador).")
