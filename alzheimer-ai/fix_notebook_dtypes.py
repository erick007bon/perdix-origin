import json

file_path = 'c:/Users/Erick Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/alzheimer-ai/MedGemma_Alzheimer_Analysis.ipynb'

with open(file_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        new_source = []
        for line in cell['source']:
            new_line = line.replace('torch.bfloat16', 'torch.float16')
            new_source.append(new_line)
        cell['source'] = new_source

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Notebook dtypes updated to float16 successfully!")
