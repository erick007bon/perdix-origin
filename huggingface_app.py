from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import tempfile
import os
import json

# Orquestador Médico
from ADNI_Fusion_Engine import PerdixAdniEngine

app = FastAPI(title="Perdix ADNI Medical Node", version="1.0.0")

# Permitir a NextJS conectarse a este motor en Hugging Face
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar por la URL de vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Inicializando Motor ADNI Neuronal en Hugging Face...")
engine = PerdixAdniEngine()

@app.get("/")
def read_root():
    return {"status": "online", "message": "Perdix ADNI Engine is running. Send POST to /diagnose."}

@app.post("/diagnose")
async def diagnose(
    age: float = Form(65.0), 
    mmse_score: float = Form(25.0), 
    edu_years: float = Form(12.0),
    mri_scan: UploadFile = File(...)
):
    try:
        # Guardar el MRI subido por red en un archivo temporal seguro
        with tempfile.NamedTemporaryFile(delete=False, suffix=".nii.gz") as tmp:
            shutil.copyfileobj(mri_scan.file, tmp)
            tmp_path = tmp.name
        
        # Ejecutamos la Inferencia de Keras y XGBoost Combinados
        result = engine.diagnose_patient(
            nifti_path=tmp_path, 
            age=age, 
            mmse_score=mmse_score, 
            edu_years=edu_years
        )
        
        # Generar ID Clínico Unico
        import uuid
        result["diagnosis_id"] = "ADNI-" + str(uuid.uuid4())[:8]
        result["risk_score_exact"] = result["breakdown"]["AD"] / 100.0
        result["risk_level"] = "HIGH" if result["risk_score_exact"] > 0.6 else ("MODERATE" if result["risk_score_exact"] > 0.3 else "LOW")
        result["recommendation"] = "Patrones degenerativos compatibles con Alzheimer analizados bajo red ADNI."
        
        # Limpieza de Disco 
        os.unlink(tmp_path)
        
        return result
        
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
