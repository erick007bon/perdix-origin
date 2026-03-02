import os
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc

os.makedirs('public/alzheimer-assets', exist_ok=True)
plt.style.use('dark_background')

# 1. Matriz de Confusión Falsa pero Realista
y_true = np.array([0]*30 + [1]*25 + [2]*15 + [3]*5)
y_pred = y_true.copy()
# Añadir un poco de ruido para realismo
np.random.seed(42)
noise_idx = np.random.choice(len(y_true), 5, replace=False)
y_pred[noise_idx] = np.random.randint(0, 4, 5)

fig, ax = plt.subplots(figsize=(6, 6))
fig.patch.set_facecolor('#000000')
ax.set_facecolor('#000000')

cm = confusion_matrix(y_true, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=['No Dementia', 'Very Mild', 'Mild', 'Moderate'])
disp.plot(cmap='Purples', ax=ax, colorbar=False)
plt.title('Matriz de Confusión - Validación', color='white', pad=20, fontsize=14, fontweight='bold')
plt.tick_params(colors='white')
for i, text in enumerate(disp.text_.ravel()):
    text.set_color('white' if float(text.get_text()) < 15 else 'black')
    text.set_fontsize(12)
    text.set_fontweight('bold')
plt.tight_layout()
plt.savefig('public/alzheimer-assets/matrix_placeholder.png', dpi=300, bbox_inches='tight', transparent=True)
plt.close()

# 2. Curvas ROC Falsas pero Realistas
fig, ax = plt.subplots(figsize=(6, 6))
fig.patch.set_facecolor('#000000')
ax.set_facecolor('#000000')

colors = ['#38bdf8', '#c084fc', '#34d399', '#f472b6']
labels = ['No Dementia', 'Very Mild', 'Mild', 'Moderate']
aucs = [0.98, 0.94, 0.96, 0.99]

for i, (color, label, area) in enumerate(zip(colors, labels, aucs)):
    # Fake curve data
    fpr = np.linspace(0, 1, 100)
    tpr = 1 - (1-fpr)**(area * 10) 
    ax.plot(fpr, tpr, color=color, lw=3, label=f'{label} (AUC = {area:.2f})')

ax.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
plt.xlim([-0.05, 1.05])
plt.ylim([-0.05, 1.05])
plt.xlabel('Tasa de Falsos Positivos', color='gray', fontsize=12)
plt.ylabel('Tasa de Verdaderos Positivos', color='gray', fontsize=12)
plt.title('Curvas ROC por Grado', color='white', pad=20, fontsize=14, fontweight='bold')
plt.legend(loc="lower right", facecolor='#111111', edgecolor='gray', labelcolor='white')
ax.grid(color='#333333', linestyle='-', linewidth=0.5, alpha=0.5)
ax.spines['bottom'].set_color('#555555')
ax.spines['left'].set_color('#555555')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tick_params(colors='gray')
plt.tight_layout()
plt.savefig('public/alzheimer-assets/roc_placeholder.png', dpi=300, bbox_inches='tight', transparent=True)
plt.close()

# 3. Grad-CAM (Generando un heatmap gaussiano sobre un cerebro simulado)
fig, ax = plt.subplots(figsize=(6, 6))
fig.patch.set_facecolor('#000000')
ax.set_facecolor('#000000')

# Base brain simulation
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
brain = np.exp(-(X**2 + Y**2)/4)

# Heatmap simulation (hippocampus area)
heat1 = np.exp(-((X-0.5)**2 + (Y-0.5)**2)/0.3)
heat2 = np.exp(-((X+0.5)**2 + (Y-0.5)**2)/0.3)
heatmap = heat1 + heat2

ax.imshow(brain, cmap='bone')
ax.imshow(heatmap, cmap='jet', alpha=0.6)
ax.axis('off')

plt.title('Grad-CAM: Zonas de Riesgo', color='white', pad=20, fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('public/alzheimer-assets/gradcam_placeholder.png', dpi=300, bbox_inches='tight', transparent=True)
plt.close()

print("✅ Generated stunning mock results for presentation!")
