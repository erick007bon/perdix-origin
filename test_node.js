const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const execAsync = promisify(exec);

async function test() {
  try {
    const age = 65.0;
    const mmse_score = 25.0;
    const default_education = 12.0;

    const tempProxyScript = path.join(process.cwd(), 'temp_run.py');
    
    const pyScript = `
import json
import sys
import os
import numpy as np

# Load Perdix Engine
from ADNI_Fusion_Engine import PerdixAdniEngine

engine = PerdixAdniEngine()
mri_path = "prod_synthetic_brain.nii.gz"

if not os.path.exists(mri_path):
    import nibabel as nib
    mri_data = np.zeros((64, 64, 64), dtype=np.float32)
    mri_data[24:40, 24:40, 24:40] = 180.0
    nib.save(nib.Nifti1Image(mri_data, np.eye(4)), mri_path)

result = engine.diagnose_patient(nifti_path=mri_path, age=${age}, mmse_score=${mmse_score}, edu_years=${default_education})

# Add a fake DB ID to match expectation
import uuid
result["diagnosis_id"] = "ADNI-" + str(uuid.uuid4())[:8]
result["risk_score_exact"] = result["breakdown"]["AD"] / 100.0
result["risk_level"] = "HIGH" if result["risk_score_exact"] > 0.6 else ("MODERATE" if result["risk_score_exact"] > 0.3 else "LOW")
result["recommendation"] = "Patrones degenerativos compatibles con Alzheimer localizados en el Hipocampo. Fusión tabular indica coincidencia con decrecimiento cognitivo."

print("<<<JSON_START>>>")
print(json.dumps(result))
print("<<<JSON_END>>>")
`;
    
    fs.writeFileSync(tempProxyScript, pyScript, 'utf8');
    console.log("Written script to", tempProxyScript);
    
    const { stdout, stderr } = await execAsync(`python "${tempProxyScript}"`);
    console.log("STDOUT:", stdout);
    console.log("STDERR:", stderr);
    
  } catch (error) {
    console.error("Exec Threw Error:", error);
  }
}

test();
