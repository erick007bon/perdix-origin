import nibabel as nib
import numpy as np
import os
import monai
from monai.transforms import (
    Compose,
    LoadImaged,
    EnsureChannelFirstd,
    ScaleIntensityd,
    Resized
)

print(f"MONAI Version: {monai.__version__}")
print(f"Nibabel Version: {nib.__version__}")

def create_synthetic_mri(filename="synthetic_brain.nii.gz"):
    """
    Crea un volumen 3D falso (.nii.gz) en disco para emular un scaneo cerebral
    de MRI, con algunas esferas adentro para simular materia blanca/gris.
    """
    print(f"\n[1] Generando MRI sintético: {filename}...")
    # Volumen 3D de 64x64x64
    data = np.zeros((64, 64, 64), dtype=np.float32)
    # Background "brain"
    data[16:-16, 16:-16, 16:-16] = 50.0
    # "Ventrículos" o hipocampo (mayor intensidad)
    data[24:40, 24:40, 24:40] = 150.0
    
    # Crear un objeto NIfTI usando nibabel
    img = nib.Nifti1Image(data, affine=np.eye(4))
    nib.save(img, filename)
    print(f"    -> Archivo físico creado en: {os.path.abspath(filename)}")

def test_monai_pipeline(filename="synthetic_brain.nii.gz"):
    """
    Prueba el poder de MONAI para leer archivos NIfTI y mandarlos directo
    al pipeline de PyTorch con Resize y ScaleIntensity (estándares de ADNI).
    """
    print("\n[2] Inicializando Preprocessing Pipeline ADNI-Like (MONAI)...")
    
    # Este 'Compose' es la caja negra que los analistas de ADNI usan:
    val_transforms = Compose([
        LoadImaged(keys=["image"]),
        EnsureChannelFirstd(keys=["image"]),
        ScaleIntensityd(keys=["image"]),          # Normaliza valores a 0.0 - 1.0
        Resized(keys=["image"], spatial_size=(32, 32, 32)) # Cortamos el volumen por RAM
    ])
    
    # Creamos un batch de un solo diccionario
    input_data = [{"image": filename}]
    
    print("    -> Ejecutando Pipeline en Tensores de memoria...")
    processed_data = val_transforms(input_data)[0]
    
    tensor_img = processed_data["image"]
    
    print("\n[3] RESULTADOS FINALES DEL MOTOR TENSOR:")
    print(f"    - Objeto retornado: {type(tensor_img)}")
    print(f"    - Forma del Tensor (Canal, X, Y, Z): {tensor_img.shape}")
    print(f"    - Rango de valores (Debe ser normalizado entre 0 y 1): "
          f"Min={tensor_img.min():.2f}, Max={tensor_img.max():.2f}")
    
    assert tensor_img.shape == (1, 32, 32, 32), "El pipeline no hizo Resize correctametne!"
    print("\n✅ EXITO TOTAL: El entorno Keras/PyTorch y MONAI se comunican perfectamente.")

if __name__ == "__main__":
    test_file = "synthetic_brain.nii.gz"
    create_synthetic_mri(test_file)
    test_monai_pipeline(test_file)
    # Limpiamos
    if os.path.exists(test_file):
        os.remove(test_file)
