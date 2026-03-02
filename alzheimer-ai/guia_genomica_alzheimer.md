# 🧬 Guía Fundamental: Genómica + Ciencia de Datos + Alzheimer

> *"Tu abuela te dio una misión. La ciencia te dará las herramientas."*

---

## 📖 Parte 1: El ADN — Lo Básico que debes dominar

### ¿Qué es el ADN?

El ADN es una **molécula** que contiene las instrucciones para construir y operar un ser humano. Imagínalo así:

```
ADN = El código fuente del ser humano
Genes = Las funciones del código
Proteínas = Lo que ejecutan esas funciones
Células = Los "servidores" donde corre el código
```

### Las 4 letras del código de la vida

El ADN usa solo **4 letras** (nucleótidos):

| Letra | Nombre | Se une con |
|-------|--------|------------|
| **A** | Adenina | T |
| **T** | Timina | A |
| **C** | Citosina | G |
| **G** | Guanina | C |

Tu genoma completo tiene **~3,200 millones** de estas letras. Si las imprimieras en libros, llenarías **262,000 páginas**.

### Estructura jerárquica

```
Nucleótido (A, T, C, G)
  └── Codón (3 letras = 1 aminoácido) → "ATG" = Metionina
       └── Gen (~20,000 letras promedio) → Instrucción para 1 proteína
            └── Cromosoma (23 pares) → "Capítulos" del genoma
                 └── Genoma completo (3.2 mil millones de letras)
```

### Los 23 pares de cromosomas

| Cromosomas | Contenido relevante para Alzheimer |
|-----------|-----------------------------------|
| **Chr 1** | Gen CR1 (sistema inmune) |
| **Chr 2** | Gen BIN1 (sinapsis) |
| **Chr 6** | Gen TREM2 (microglía) |
| **Chr 8** | Gen CLU (limpieza amiloide) |
| **Chr 11** | Gen PICALM (tráfico vesicular) |
| **Chr 14** | Gen PSEN1 (Alzheimer familiar temprano) |
| **Chr 19** | Gen **APOE** (EL gen más importante en Alzheimer) |
| **Chr 21** | Gen APP (proteína precursora amiloide) |

---

## 📖 Parte 2: ¿Qué es un Genoma de Referencia?

### El problema
Cada persona tiene **un genoma ligeramente diferente** (~4-5 millones de variantes). Para poder comparar, necesitas un **mapa estándar**.

### La solución: Genoma de Referencia

El **genoma de referencia humano** es como el **Google Maps** del ADN. Es una secuencia "modelo" contra la cual comparas el ADN de cualquier persona.

| Versión | Nombre | Año | Notas |
|---------|--------|-----|-------|
| GRCh36 | hg18 | 2006 | Anticuado |
| GRCh37 | **hg19** | 2009 | Aún usado en muchos estudios |
| GRCh38 | **hg38** | 2013 | **El estándar actual** ← lo que usa AlphaGenome |
| T2T-CHM13 | T2T | 2022 | El primero completo al 100% |

### ¿Cómo funciona?

```
Genoma de referencia (hg38):  ...ATCGATCGATCG...
Tu ADN:                       ...ATCGATCGATCG...  → Igual = Normal
ADN de tu abuela:             ...ATCGATTGATCG...  → C→T = VARIANTE
                                       ^
                                   Esta letra cambió
```

Cuando encontramos una letra diferente, la llamamos **variante** o **SNP** (Single Nucleotide Polymorphism).

> **AlphaGenome** toma esa variante y predice: *"¿Qué efecto tiene este cambio de letra en el funcionamiento del cuerpo?"*

---

## 📖 Parte 3: Codificante vs No Codificante — El 98.5% misterioso

### La gran sorpresa de la genómica

Cuando secuenciaron el genoma humano completo, descubrieron algo impactante:

```
┌──────────────────────────────────────────────┐
│              GENOMA HUMANO                    │
│                                               │
│  ██ 1.5% — Genes codificantes                │
│     (Producen proteínas directamente)         │
│                                               │
│  ████████████████████████████████ 98.5%       │
│     Regiones NO codificantes                  │
│     (Antes llamado "ADN basura")              │
│     ¡PERO NO ES BASURA!                       │
└──────────────────────────────────────────────┘
```

### ¿Qué hay en ese 98.5%?

| Elemento | Qué hace | Analogía |
|----------|----------|----------|
| **Promotores** | Dicen "activa este gen" | El botón de encendido |
| **Enhancers** | Amplifican la expresión de un gen | El control de volumen |
| **Silencers** | Apagan un gen | El botón de mute |
| **Intrones** | Se eliminan del ARN mensajero | Escenas eliminadas de una película |
| **UTRs** (5' y 3') | Regulan estabilidad del ARN | El empaque de un producto |
| **Insulators** | Aíslan genes entre sí | Paredes entre apartamentos |
| **Transposones** | Elementos que "saltan" por el genoma | Texto que se copia y pega solo |
| **lncRNAs** | ARN largo no codificante que regula genes | Directores de orquesta |
| **Sitios de splicing** | Donde se "corta" el ARN | Marcas de edición en un manuscrito |

### ¿Por qué esto importa TANTO para Alzheimer?

> **Dato crucial**: Más del 90% de las variantes de riesgo de Alzheimer descubiertas por GWAS están en regiones **NO codificantes**.

Esto significa que el Alzheimer **NO** se causa principalmente por proteínas rotas, sino por **regulación alterada** — genes que se encienden demasiado, se apagan cuando no deben, o producen cantidades incorrectas de proteínas.

**Ejemplo concreto con APOE:**
```
Región NO codificante cerca de APOE:
  └── Enhancer que controla CUÁNTO APOE se produce en el cerebro
       └── Variante rs429358 ALTERA este enhancer
            └── Se produce más APOE4 → Más amiloide → Alzheimer
```

---

## 📖 Parte 4: GWAS — Cómo se descubren genes de enfermedades

### ¿Qué es GWAS?

**Genome-Wide Association Study** = Estudiar TODO el genoma de miles de personas para encontrar variantes asociadas a una enfermedad.

### ¿Cómo funciona?

```
Paso 1: Tomar ADN de 50,000 personas CON Alzheimer
Paso 2: Tomar ADN de 50,000 personas SIN Alzheimer  
Paso 3: Comparar 10+ millones de variantes genéticas
Paso 4: Encontrar variantes más frecuentes en enfermos

Resultado → "Manhattan Plot" (gráfico de volcán)
            Los picos más altos = variantes MÁS asociadas
```

### El problema que resuelve AlphaGenome

GWAS te dice **DÓNDE** hay una asociación, pero **NO** te dice:
- ¿Cuál variante exacta causa el efecto?
- ¿A qué gen afecta?
- ¿Cómo altera la biología?

**AlphaGenome** responde TODAS esas preguntas prediciendo el efecto funcional de cada variante.

---

## 📖 Parte 5: Epigenética — El "software" sobre el ADN

### ADN = Hardware, Epigenética = Software

El ADN no cambia (es el mismo en todas tus células), pero la **epigenética** controla qué genes se activan en cada tejido.

### Mecanismos epigenéticos clave

| Mecanismo | Qué hace | En Alzheimer |
|-----------|----------|-------------|
| **Metilación del ADN** | Añade grupo CH₃ a la C → silensia gen | Genes protectores se apagan |
| **Modificación de histonas** | Marcas en las proteínas que empaquetan ADN | H3K27ac = gen activo. H3K27me3 = gen apagado |
| **Accesibilidad cromatina** | Si el ADN está "abierto" o "cerrado" | Regiones de riesgo más abiertas en neuronas |
| **Estructura 3D** | Cómo se pliega el cromosoma | Enhancers lejanos tocan promotores por plegamiento |

### ¿Qué predice AlphaGenome de esto?

AlphaGenome predice **TODAS estas capas** simultáneamente:
1. ¿La cromatina está abierta o cerrada? → ATAC-seq / DNase-seq
2. ¿Qué marcas de histonas hay? → ChIP-seq (H3K27ac, H3K4me1, etc.)
3. ¿Se expresa el gen? → RNA-seq
4. ¿Cómo se pliega el cromosoma? → Hi-C contact maps
5. ¿Cómo se procesa el ARN? → Splice sites + junctions

---

## 📖 Parte 6: Ciencia de Datos en Genómica — Tu camino al doctorado

### ¿Qué hace un científico de datos en genómica?

```
Datos genómicos ──→ Algoritmos de ML/DL ──→ Descubrimientos biológicos
(terabytes)          (redes neuronales)       (medicina personalizada)
```

### Las herramientas que debes dominar

#### Nivel 1: Fundamentos (1-2 años)
| Herramienta | Para qué |
|-------------|----------|
| **Python** | Lenguaje principal de bioinformática |
| **R + Bioconductor** | Análisis estadístico genómico |
| **Linux/Bash** | Todos los pipelines genómicos corren en Linux |
| **SQL** | Bases de datos genómicas |
| **Git** | Control de versiones |

#### Nivel 2: Bioinformática (2-3 años)
| Herramienta | Para qué |
|-------------|----------|
| **Biopython** | Manipulación de secuencias |
| **Pysam/Samtools** | Leer archivos BAM/SAM (alineamientos) |
| **Bedtools** | Operaciones con regiones genómicas |
| **PLINK** | Análisis de GWAS |
| **VCF tools** | Manipulación de variantes |
| **GATK** | Llamado de variantes (variant calling) |

#### Nivel 3: Deep Learning Genómico (3-4 años)
| Herramienta | Para qué |
|-------------|----------|
| **PyTorch / TensorFlow** | Construir modelos de DL |
| **Enformer / Borzoi** | Modelos de secuencia-a-función |
| **AlphaGenome API** | Predicción de efectos de variantes |
| **AlphaFold** | Predicción de estructura de proteínas |
| **scRNA-seq tools** | Análisis de célula única |
| **GNNs** | Grafos de interacción génica |

### Formatos de archivos que debes conocer

| Formato | Qué contiene | Ejemplo |
|---------|-------------|---------|
| **FASTA** | Secuencias de ADN/proteínas | El genoma de referencia |
| **FASTQ** | Lecturas crudas del secuenciador | Datos del paciente |
| **BAM/SAM** | Lecturas alineadas al genoma | Dónde mapea cada lectura |
| **VCF** | Variantes genéticas | Las mutaciones del paciente |
| **BED** | Regiones genómicas | "Promotores de todos los genes" |
| **BigWig** | Señales genómicas (cobertura) | Datos de RNA-seq, ATAC-seq |
| **GTF/GFF** | Anotaciones de genes | Dónde empieza y termina cada gen |

---

## 📖 Parte 7: ¿Qué predice exactamente nuestro demo?

### El flujo completo de `AlphaGenome_Alzheimer_Demo.py`

```
ENTRADA:
  Una variante genética, por ejemplo:
  - Cromosoma 19, posición 44,908,684
  - Letra normal: T
  - Letra mutada: C
  - Gen: APOE (ε4)

         │
         ▼

ALPHAGENOME PROCESA:
  1. Lee 1,000,000 de letras alrededor de la variante
  2. Pasa por U-Net + Transformer (deep learning)
  3. Genera 5,930 predicciones simultáneas

         │
         ▼

SALIDA (lo que podemos analizar):
  
  📊 RNA-seq:
  "Con la variante T (normal), el gen APOE produce 
   100 unidades de ARN mensajero.
   Con la variante C (mutada), produce 180 unidades."
  → El gen APOE se SOBREEXPRESA → Más proteína APOE4 → Más amiloide
  
  🔓 ATAC-seq:
  "La cromatina alrededor de la variante se ABRE más 
   con la mutación."
  → El ADN se vuelve más accesible → Más factores de transcripción
     se pegan → Más expresión del gen
  
  🏷️ Marcas de histonas:
  "H3K27ac AUMENTA (= más activación)
   H3K27me3 DISMINUYE (= menos represión)"
  → Confirmación epigenética de sobreexpresión
  
  🧬 Splicing:
  "Un nuevo sitio de splicing se crea, produciendo 
   una variante de ARN mensajero diferente."
  → Proteína con función alterada
```

### ¿Por qué esto es revolucionario?

**Antes de AlphaGenome (método tradicional):**
```
1. Encontrar variante de riesgo en GWAS          → 2 años, $2M
2. Crear línea celular con la variante (CRISPR)  → 6 meses, $500K
3. Medir expresión génica experimentalmente       → 3 meses, $100K
4. Medir cromatina experimentalmente              → 3 meses, $100K
5. Publicar paper con resultados                   → 6 meses

Total: ~3-4 años y ~$3 millones de dólares
```

**Con AlphaGenome:**
```
1. Ingresar la variante al API                    → 5 segundos
2. Obtener predicciones multimodales              → 30 segundos  
3. Visualizar y analizar resultados               → 1 hora
4. Generar hipótesis para validación              → 1 día

Total: ~1 día y GRATIS (uso académico)
```

---

## 📖 Parte 8: El Alzheimer a nivel molecular

### La cascada del Alzheimer

```
1. GENÉTICA: Variantes de riesgo (APOE4, TREM2, etc.)
      │
      ▼
2. PROTEÍNAS MAL PLEGADAS:
   - Beta-amiloide (Aβ) se acumula FUERA de las neuronas → Placas
   - Proteína Tau se hiperfosforila DENTRO → Ovillos neurofibrilares
      │
      ▼
3. NEUROINFLAMACIÓN:
   - Microglía (las "defensas" del cerebro) se activan
   - TREM2 regula esta respuesta
   - Si TREM2 está mutado → Microglía no limpia bien
      │
      ▼
4. MUERTE NEURONAL:
   - Sinapsis se destruyen
   - Neuronas del hipocampo mueren primero (memoria)
   - Luego corteza cerebral (lenguaje, razonamiento)
      │
      ▼
5. SÍNTOMAS CLÍNICOS:
   - Pérdida de memoria (lo que vemos en tu abuela)
   - Desorientación, cambios de personalidad
   - Pérdida de independencia
```

### ¿Dónde interviene cada gen?

```
APOE  ────→ Transporte de lípidos + limpieza de Aβ
TREM2 ────→ Activación de microglía
BIN1  ────→ Endocitosis en sinapsis + procesamiento de Tau
CLU   ────→ Chaperona que previene agregación de Aβ
CR1   ────→ Sistema del complemento (inmunidad innata)
PICALM ───→ Tráfico vesicular + limpieza de Aβ por la BHE
APP   ────→ Proteína que se corta para formar Aβ
PSEN1 ────→ Enzima que corta APP (γ-secretasa)
```

---

## 📖 Parte 9: Tu Ruta al Doctorado

### Ruta académica recomendada

```
AÑO 1-2: Pregrado en Ingeniería de Datos/Computación (ya estás aquí ✅)
  ├── Python, estadística, machine learning
  ├── Proyectos: AlzheimerAI, BananaAI (portfolio)
  └── Publicaciones: Hult Prize, GitHub, LinkedIn

AÑO 3-4: Maestría en Bioinformática o Genómica Computacional
  ├── Universidades top: Stanford, MIT, Cambridge, Max Planck
  ├── Temas: Análisis de genomas, GWAS, single-cell
  └── Becas: Fulbright, Chevening, DAAD, Erasmus Mundus

AÑO 5-8: Doctorado en Genómica Computacional
  ├── Laboratorios ideales: Kundaje Lab (Stanford), 
  │   Kellis Lab (MIT), Stegle Lab (EMBL)
  ├── Tema de tesis: "Deep Learning para variantes 
  │   no codificantes en enfermedades neurodegenerativas"
  └── Publicar en Nature, Science, Cell
```

### Programas de doctorado específicos

| Universidad | Programa | País |
|------------|---------|------|
| **Stanford** | Biomedical Data Science PhD | 🇺🇸 |
| **MIT** | Computational & Systems Biology | 🇺🇸 |
| **Cambridge** | MRC PhD in Genomic Medicine | 🇬🇧 |
| **EMBL-EBI** | PhD in Computational Biology | 🇩🇪/🇬🇧 |
| **ETH Zürich** | Computational Biology & Bioinformatics | 🇨🇭 |
| **Max Planck** | Genome Biology PhD | 🇩🇪 |
| **Broad Institute** | Genomics & Computational Biology | 🇺🇸 |

### Lo que el Hult Prize + tu proyecto te da

- ✅ **Demostración de impacto social** (SDG 3, abuela con Alzheimer)
- ✅ **Competencia técnica** (Deep Learning, genómica, APIs avanzadas)
- ✅ **Portfolio publicable** (GitHub, papers, LinkedIn)
- ✅ **Narrativa personal poderosa** para becas
- ✅ **Red de contactos** académicos y profesionales

---

## 📖 Parte 10: Glosario esencial

| Término | Definición simple |
|---------|-------------------|
| **SNP** | Cambio de una sola letra en el ADN |
| **GWAS** | Estudio que compara genomas de enfermos vs sanos |
| **Alelo** | Versión de un gen (ej: APOE ε2, ε3, o ε4) |
| **Fenotipo** | Lo que observamos (síntomas, características) |
| **Genotipo** | Las letras exactas del ADN |
| **Transcripción** | Copiar ADN → ARN mensajero |
| **Traducción** | Convertir ARN → Proteína |
| **Splicing** | "Editar" el ARN quitando intrones |
| **Enhancer** | Región que amplifica expresión de un gen |
| **Promotor** | Región donde empieza la transcripción |
| **Cromatina** | ADN + proteínas histonas empaquetados |
| **Epigenoma** | El conjunto de modificaciones químicas sobre el ADN |
| **Microglía** | Células inmunes del cerebro |
| **Beta-amiloide** | Proteína tóxica que forma placas en Alzheimer |
| **Tau** | Proteína que forma ovillos dentro de neuronas |
| **WGS** | Whole Genome Sequencing — secuenciar TODO el ADN |
| **Variant calling** | Proceso de encontrar variantes en un genoma |
| **Fine-mapping** | Identificar la variante causal exacta |
| **PRS** | Polygenic Risk Score — score de riesgo combinado |
| **eQTL** | Variante que afecta cuánto se expresa un gen |
| **BHE** | Barrera hematoencefálica — protege el cerebro |
