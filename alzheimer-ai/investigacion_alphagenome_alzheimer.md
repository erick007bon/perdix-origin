# 🧬 AlphaGenome + Alzheimer: Investigación Profunda

## ¿Qué es AlphaGenome?

**AlphaGenome** es un modelo de **Deep Learning** de **Google DeepMind**, publicado en **Nature** (enero 2026), que lee **1 millón de pares de bases** de ADN y predice **5,930 tracks genómicos** a resolución de **un solo par de bases**.

### Arquitectura Técnica
- Backbone tipo **U-Net** con capas convolucionales + bloques Transformer
- Procesamiento paralelo en **8 TPU v3** de Google
- Embeddings 1D (1bp y 128bp) para tracks lineales
- Embeddings 2D (2,048bp) para mapas de contacto 3D del cromosoma

### ¿Qué predice? (11 modalidades)

| Modalidad | Qué mide |
|-----------|----------|
| **RNA-seq** | Expresión génica |
| **CAGE** | Inicio de transcripción |
| **PRO-cap** | Transcripción naciente |
| **Splice sites** | Sitios de corte del ARN |
| **Splice junctions** | Uniones entre exones |
| **DNase-seq** | Accesibilidad del ADN |
| **ATAC-seq** | Cromatina abierta |
| **ChIP-seq (histonas)** | Modificaciones de histonas |
| **ChIP-seq (TF)** | Unión de factores de transcripción |
| **Hi-C / Micro-C** | Contactos 3D del cromosoma |
| **Splice usage** | Uso de sitios de splicing |

### Rendimiento
- **25 de 26** evaluaciones de efectos de variantes: **MEJOR** que todos los modelos existentes
- **22 de 24** tareas de predicción de tracks genómicos: **Estado del arte**
- Supera a: Enformer, Borzoi, SpliceAI, ChromBPNet, Orca

---

## 🧠 Conexión con Alzheimer

### El Problema Fundamental

> **Más del 98% de las variantes genéticas humanas están en regiones NO codificantes** del ADN. Los métodos tradicionales no pueden interpretar estas variantes.

El Alzheimer tiene una **base genética compleja**:
- **No es un solo gen** → Son cientos de variantes en todo el genoma
- La mayoría están en **regiones reguladoras** (no producen proteínas)
- Afectan **cómo, cuándo y cuánto** se expresan los genes en el cerebro

### Genes Clave del Alzheimer (GWAS 2024-2025)

| Gen | Función | Importancia |
|-----|---------|-------------|
| **APOE ε4** | Transporte de lípidos | El mayor factor de riesgo genético. Aumenta riesgo **3-15x** |
| **TREM2** | Respuesta inmune microglial | 2do más importante. Variantes raras aumentan riesgo **2-4x** |
| **BIN1** | Endocitosis, sinapsis | 2do locus más significativo después de APOE |
| **CASP8** | Muerte celular programada | **NUEVO 2025**: Duplica riesgo de Alzheimer tardío |
| **APP** | Proteína precursora amiloide | Mutaciones causan Alzheimer familiar temprano |
| **PSEN1/PSEN2** | Procesamiento de APP | Causan Alzheimer familiar (onset <65 años) |
| **COL4A1** | Colágeno vascular | **NUEVO 2024**: Vinculado a patología vascular + demencia |
| **PIK3R5** | Señalización celular | **NUEVO 2024**: Nuevo gen de demencia |
| **LZTS1** | Supresor tumoral | **NUEVO 2024**: Vinculado a neuropatología |
| **MPDZ** | Uniones celulares | **NUEVO 2024**: En población de ascendencia africana |

### Descubrimientos Recientes (2024-2025)

1. **156 nuevas variantes** identificadas, 133 completamente nuevas (agosto 2025)
2. **16 nuevos genes** de susceptibilidad al Alzheimer (WGS multi-ancestría, feb 2025)
3. **118 loci significativos** en GWAS multi-ancestría, 41 nuevos (oct 2025)
4. Variante protectora que **reduce riesgo 70%** — gen de fibronectina que limpia amiloide (Columbia, 2024)
5. **CASP8** — nueva mutación que acumula proteínas tóxicas polyGR (UF Health, feb 2025)

---

## 🔬 ¿Cómo AlphaGenome ayuda específicamente con Alzheimer?

### 1. Interpretar Variantes No-Codificantes
- GWAS identifica **regiones** asociadas al riesgo, pero no puede decir **cuál variante exacta** causa el efecto
- AlphaGenome puede **predecir el efecto funcional** de cada variante individual
- Ejemplo demostrado: variantes del oncogén TAL1, donde AlphaGenome predijo correctamente la formación de neo-enhancers y cambios en marcas de histonas

### 2. Análisis Multimodal
- Una sola variante puede afectar **múltiples modalidades** simultáneamente
- AlphaGenome puede mostrar si una variante:
  - Abre la cromatina en el cerebro
  - Aumenta expresión de un gen de riesgo
  - Altera el splicing del ARN
  - Crea un nuevo sitio de unión para un factor de transcripción

### 3. Especificidad de Tejido
- Las predicciones son **específicas por tipo celular/tejido**
- Puede predecir efectos en neuronas vs. microglía vs. astrocitos
- Crucial para Alzheimer: el mismo gen puede comportarse diferente en cerebro vs. hígado

### 4. Priorización de Variantes
- De **miles de variantes** asociadas al Alzheimer, AlphaGenome puede **rankear** cuáles son más probables de ser causales
- Acelera la transición de GWAS → descubrimiento de fármacos

---

## 📊 Otros Modelos de IA Relevantes

| Modelo | Institución | Qué hace |
|--------|------------|----------|
| **TREDNet** | - | Predice efectos regulatorios de variantes en Alzheimer |
| **SIGNET** | UCSD | Descubre relaciones causa-efecto entre genes (encontró hub genes de Alzheimer) |
| **Enformer** | DeepMind | Predecesor de AlphaGenome. Contexto de 200kb |
| **Borzoi** | Calico | Resolución 32bp, contexto 500kb |
| **SpliceAI** | Illumina | Especialista en splicing. 10kb de contexto |
| **ChromBPNet** | Stanford | Accesibilidad local de cromatina |
| **PRS-AI** | Varios | Scores de riesgo poligénico mejorados con deep learning (>70% precisión) |

---

## 🇪🇨 Contexto Ecuador y Latinoamérica

### Cifras del Alzheimer en Ecuador
- **Prevalencia de demencia: ~8.5%** de la población mayor
- Mortalidad por Alzheimer: **aumento sostenido 2012-2022**
- Afecta desproporcionadamente a **mujeres** y **>65 años**
- Solo **3 neurólogos por 100,000 habitantes**
- Un MRI cuesta **$200-400 USD** (medio salario mínimo)
- Apoyo gubernamental para genómica: **limitado**
- Pocos profesionales genéticos, principalmente en clínicas privadas de Quito/Guayaquil

### Contexto Latinoamericano
- Se proyecta **aumento 4x** en demencia para 2050
- Consorcio **ReDLat** estudia genética de demencia en Argentina, Brasil, Chile, Colombia, México, Perú
- Patrimonio genético diverso → variantes únicas que NO se encuentran en poblaciones europeas
- Ecuador NO está incluido en ReDLat (oportunidad)

### Oportunidad Para el Proyecto
> Ecuador tiene una brecha enorme en genómica médica. Un proyecto que conecte AlphaGenome con detección de Alzheimer sería **pionero** en el país y podría:
> - Democratizar acceso a análisis genómico
> - Identificar variantes de riesgo específicas de la población ecuatoriana
> - Crear una herramienta de screening accesible

---

## 🛠️ API de AlphaGenome — Uso Práctico

### Acceso
- **Gratis** para uso no-comercial/académico
- API key desde: https://deepmind.google.com/science/alphagenome/account/settings
- GitHub: https://github.com/google-deepmind/alphagenome

### Instalación
```bash
git clone https://github.com/google-deepmind/alphagenome.git
cd alphagenome
pip install .
export ALPHAGENOME_API_KEY="tu-api-key"
```

### Predicción de Variantes (Python)
```python
# Predecir efecto de una variante
result = client.variants.predict(
    chromosome="chr19",    # APOE está en chr19
    position=44908684,     # Posición de APOE ε4
    reference="T",
    alternate="C"
)
# Resultado: cambios predichos en expresión génica,
# accesibilidad de cromatina, splicing, etc.
```

### Lo que devuelve
- **Expresión génica**: Cambio log-fold en genes cercanos
- **Accesibilidad cromatina**: Cambios en señales ATAC-seq/DNase-seq
- **Splicing**: Efectos en sitios de splicing e inclusión de exones
- **Elementos regulatorios**: Impacto en enhancers, promotores, sitios TF
- **Cromatina 3D**: Cambios en interacciones cromosómicas

---

## 🏆 Visión del Proyecto Completo

```
┌─────────────────────────────────────────────┐
│         PERDIX VISION — AlzheimerAI          │
├─────────────────────────────────────────────┤
│                                              │
│  NIVEL 1: Detección por Imágenes (MRI)       │
│  ├── EfficientNetB0 + Transfer Learning      │
│  ├── 4 etapas de Alzheimer                   │
│  └── Ya en entrenamiento ✅                  │
│                                              │
│  NIVEL 2: Predicción Genómica (ADN)          │
│  ├── AlphaGenome API de DeepMind             │
│  ├── Análisis de variantes de riesgo         │
│  ├── Score de riesgo genético personalizado   │
│  └── Específico por población 🇪🇨             │
│                                              │
│  NIVEL 3: Integración Multimodal             │
│  ├── MRI + Genómica → Diagnóstico integral   │
│  ├── Risk Score combinado                     │
│  └── Intervención temprana personalizada      │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 📚 Referencias Clave

1. **AlphaGenome** — Nature (2026): [s41586-025-10014-0](https://www.nature.com/articles/s41586-025-10014-0)
2. **GWAS Multi-ancestría Alzheimer** — 118 loci, 41 nuevos (MedRxiv, 2025)
3. **CASP8 y Alzheimer** — UF Health (Feb 2025)
4. **Variante protectora fibronectina** — Columbia University (2024)
5. **Deep Learning Genomics vs GWAS** — NIH/PubMed
6. **ReDLat Consortium** — Demencia en Latinoamérica (MedRxiv)
7. **Alzheimer en Ecuador** — Clinical Practice & Epidemiology in Mental Health
8. **AlphaGenome GitHub** — https://github.com/google-deepmind/alphagenome
