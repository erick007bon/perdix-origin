import os
import shutil

deploy_dir = "huggingface_ready"

print(f"Limpiando {deploy_dir} ...")
if os.path.exists(deploy_dir):
    shutil.rmtree(deploy_dir)

os.makedirs(deploy_dir)
os.makedirs(os.path.join(deploy_dir, "models"), exist_ok=True)

# 1. Copiar Modelos Neurales
print("Copiando pesos generados...")
if os.path.exists("models/alzheimer_cnn_extractor.h5"):
    shutil.copy("models/alzheimer_cnn_extractor.h5", os.path.join(deploy_dir, "models/alzheimer_cnn_extractor.h5"))
    shutil.copy("models/alzheimer_cnn_extractor.keras", os.path.join(deploy_dir, "models/alzheimer_cnn_extractor.keras"))
    shutil.copy("models/alzheimer_fusion_xgb.json", os.path.join(deploy_dir, "models/alzheimer_fusion_xgb.json"))
else:
    print("WARNING: Modelos no encontrados en /models")

# 2. Copiar y renombrar app.py (Obligatorio HF)
print("Preparando app.py...")
shutil.copy("huggingface_app.py", os.path.join(deploy_dir, "app.py"))

# 3. Copiar y renombrar requirements.txt (Obligatorio HF)
print("Preparando requirements.txt...")
shutil.copy("huggingface_requirements.txt", os.path.join(deploy_dir, "requirements.txt"))

# 4. Copiar Motor Principal
print("Copiando motor...")
shutil.copy("ADNI_Fusion_Engine.py", os.path.join(deploy_dir, "ADNI_Fusion_Engine.py"))

# 5. Crear Dockerfile nativo para HF Space
print("Creando Dockerfile...")
dockerfile_content = """FROM python:3.10

# Configurar el directorio
WORKDIR /code

# Instalar los requerimientos médicos y de TensorFlow
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copiar el código del motor ADNI y FastAPI
COPY . .

# Permisos para escribir temporales en el container
RUN chmod -R 777 /code

EXPOSE 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
"""
with open(os.path.join(deploy_dir, "Dockerfile"), "w") as f:
    f.write(dockerfile_content)

print(f"\\n✅ EXITO! Todos los archivos estan dentro de la carpeta '{deploy_dir}'.")
print("Arrastra EL CONTENIDO ITERIOR de esta carpeta (no la carpeta en si) a HuggingFace.")
