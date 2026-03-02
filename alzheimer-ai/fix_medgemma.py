import json

file_path = 'c:/Users/Erick Zambrano/Desktop/linkedin/PROYECTOS/ingenieria-platform/alzheimer-ai/MedGemma_Alzheimer_Analysis.ipynb'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    # Clean up the output in every cell to make it fresh
    for cell in nb['cells']:
        if cell['cell_type'] == 'code':
            cell['outputs'] = []  # Clear outputs so the user's run is clean
            cell['execution_count'] = None

    # Apply specific fixes
    for cell in nb['cells']:
        if cell['cell_type'] == 'code' and len(cell['source']) > 0:
            src = "".join(cell['source'])
            
            # Step 0: Add env var to disable huggingface progress bars that cause widget-view+json errors
            if '# Step 0' in src:
                if 'HF_HUB_DISABLE_PROGRESS_BARS' not in src:
                    cell['source'].append('\nimport os\n')
                    cell['source'].append('os.environ["HF_HUB_DISABLE_PROGRESS_BARS"] = "1"\n')
                    
            # Step 5: Remove matplotlib emoji, fix error handling
            if '# Step 5' in src:
                new_source = []
                for line in cell['source']:
                    line = line.replace("'🧠 MedGemma: Análisis", "'MedGemma: Análisis")
                    if 'except NameError:' in line:
                        line = line.replace('except NameError:', 'except Exception as e:')
                    if 'print("❌ ERROR: No has corrido' in line:
                        line = '        print(f"❌ ERROR detallado: {e}")\n'
                    new_source.append(line)
                cell['source'] = new_source

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(nb, f, indent=1)
    
    print("MedGemma notebook updated and outputs cleared successfully!")
except Exception as e:
    print(f"Error updating config: {e}")
