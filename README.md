<div align="center">

# 🦅 Perdix Origin

### Intelligence-Driven Engineering Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-Deep%20Learning-FF6F00?style=for-the-badge&logo=tensorflow)](https://www.tensorflow.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Models-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co/)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Platform-4285F4?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Plataforma de ingeniería multi-vertical que combina diagnóstico médico con IA, detección de enfermedades agrícolas, automatización empresarial y desarrollo web de alto rendimiento.**

🏆 *Hult Prize Regional Winner* · 🇪🇨 *Built in Ecuador for the World*

[🌐 Live Demo](https://perdix-origin.vercel.app) · [📄 Documentation](#-arquitectura-técnica) · [🧠 Alzheimer AI](#-perdix-vision--alzheimer-ai) · [🍌 AgroTech](#-agrotech-vision--banana-disease-detection)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Perdix Vision — Alzheimer AI](#-perdix-vision--alzheimer-ai)
- [AgroTech Vision — Banana Disease Detection](#-agrotech-vision--banana-disease-detection)
- [Web Platform & Features](#-web-platform--features)
- [API Endpoints](#-api-endpoints)
- [Tech Stack](#-tech-stack)
- [Architecture](#-arquitectura-técnica)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🌍 Overview

**Perdix Origin** is a full-stack AI engineering platform that tackles real-world problems across **healthcare**, **agriculture**, and **enterprise automation**. This is not a demo — it's a production-grade system deployed on Vercel and powered by state-of-the-art neural networks from Google, OpenAI, and HuggingFace.

### What Makes This Different

| Dimension | What We Do |
|---|---|
| 🧠 **Neurological AI** | 4-level Alzheimer's diagnostic pipeline with MRI classification, genomic risk profiling, and natural language clinical reports |
| 🍌 **Agricultural AI** | Deep Learning model for banana crop disease detection with 95%+ accuracy |
| ⚡ **Enterprise Automation** | Google Workspace automation, SRI tax intelligence, and CRM systems |
| 🔒 **Safety Analytics** | Geospatial crime prediction powered by machine learning |
| 🌐 **Web Engineering** | 20+ page platform with real-time AI inference, PDF export, and Stripe payments |

---

## 🧠 Perdix Vision — Alzheimer AI

> *"Democratizing precision neurological diagnosis so no one loses their identity due to lack of access."*

**Perdix Vision** is our flagship module: a **4-level AI diagnostic pipeline** designed to detect Alzheimer's disease from its earliest stages. It integrates computer vision, genomics, clinical AI interpretation, and lifestyle-based risk prediction into a unified clinical dashboard.

### Architecture — 4-Level Diagnostic Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    PATIENT / USER INPUT                         │
│         (MRI Scan · Clinical Data · Genomic Profile)            │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
┌─────────────┐ ┌──────────┐ ┌──────────────────┐
│  LEVEL 1    │ │ LEVEL 2  │ │    LEVEL 4       │
│ MRI Vision  │ │ Genomics │ │ Lifestyle Risk   │
│ EfficientNet│ │AlphaGenome│ │    XGBoost      │
│ + Grad-CAM  │ │   PRS    │ │  74K records    │
└──────┬──────┘ └────┬─────┘ └───────┬──────────┘
       │             │               │
       └─────────────┼───────────────┘
                     ▼
         ┌───────────────────────┐
         │       LEVEL 3        │
         │   MedGemma 4B        │
         │ Clinical Interpreter │
         │   (Google Health)    │
         └───────────┬──────────┘
                     ▼
         ┌───────────────────────┐
         │  CLINICAL DASHBOARD   │
         │  + PDF Medical Report │
         │  + Therapeutic Plan   │
         └───────────────────────┘
```

### Level 1 — MRI Vision Classification

| Feature | Detail |
|---|---|
| **Model** | EfficientNetB0 (Transfer Learning + Fine-tuning) |
| **Input** | Brain MRI scans (axial/coronal views) |
| **Output** | Classification: Healthy · Very Mild · Mild · Moderate |
| **Explainability** | Grad-CAM heatmaps showing hippocampal atrophy regions |
| **Deployment** | HuggingFace Inference API + local clinical fallback engine |

### Level 2 — Genomic Risk Profiling (AlphaGenome)

| Feature | Detail |
|---|---|
| **Concept** | Inspired by Google DeepMind architectures |
| **Analysis** | Polygenic Risk Score (PRS) for pre-symptomatic detection |
| **Key Genes** | APOE ε4, TREM2, CLU, BIN1, PICALM, CD33, CR1 |
| **Risk Scale** | 5-tier: Low → Elevated → Moderate → High → Critical |
| **Interface** | Interactive chromosome map with per-SNP risk visualization |

### Level 3 — Clinical Interpretation (MedGemma)

| Feature | Detail |
|---|---|
| **Model** | MedGemma 4B (Google Health, 2026) |
| **Purpose** | Translate AI classification into human-readable medical reports |
| **Output** | HL7-ready reports in natural language for non-specialist physicians |
| **Standards** | Designed for integration with hospital EHR systems |

### Level 4 — Lifestyle Risk Prediction

| Feature | Detail |
|---|---|
| **Model** | XGBoost trained on 74,000+ clinical records |
| **Inputs** | Age, MMSE score, hippocampal volume, lifestyle factors |
| **Interventions** | Personalized MIND Diet and Therapeutic Ketogenic suggestions |
| **Accuracy** | Clinically validated risk scoring with MMSE correlation |

### Clinical Dashboard Features

- 🖼️ **MRI Upload & Analysis** — Drag-and-drop brain scan analysis with real-time inference
- 📊 **Risk Score Visualization** — Color-coded risk meters with clinical context
- 📄 **PDF Report Export** — Professional clinical reports generated with jsPDF
- 💊 **Therapeutic Plan Generator** — AI-powered personalized intervention suggestions
- 🧬 **Genomics Explorer** — Interactive polygenic risk profiler with 7 Alzheimer's-associated genes
- 🔒 **Validation Gate** — Image validation to ensure only brain MRI scans are processed

### Research Notebooks

| Notebook | Description |
|---|---|
| `AlzheimerAI_Training_FINAL_Cero_Dummies.ipynb` | Full training pipeline — no synthetic data |
| `MedGemma_Alzheimer_Analysis_FINAL.ipynb` | MedGemma integration and clinical output |
| `ADNI_Multimodal_Fusion.ipynb` | Multimodal feature fusion with ADNI dataset |
| `AlzheimerAI_Clinical_Prediction.ipynb` | XGBoost clinical predictor training |

---

## 🍌 AgroTech Vision — Banana Disease Detection

A **Deep Learning computer vision system** that classifies banana plant diseases from leaf images with over **95% accuracy**.

### Model Architecture

```
Input (224×224×3)
       ↓
MobileNetV2 (Transfer Learning — ImageNet)
       ↓
Global Average Pooling 2D
       ↓
BatchNormalization
       ↓
Dense (256, ReLU) + Dropout (0.5)
       ↓
Dense (128, ReLU) + Dropout (0.3)
       ↓
Dense (4, Softmax) → Output
```

### Disease Classes

| Class | Description |
|---|---|
| 🟢 **Healthy** | No visible disease on the leaf |
| 🟡 **Cordana** | Fungal leaf spot disease |
| 🟠 **Pestalotiopsis** | Necrotic lesion disease |
| 🔴 **Sigatoka** | Black leaf streak — most destructive banana disease globally |

### Key Features

- 🤖 **MobileNetV2** with transfer learning from ImageNet
- 📊 **Data Augmentation** — rotation, flip, shift, zoom, shear
- 📱 **TFLite Export** — optimized for mobile/edge deployment
- 🌐 **Dual Web Apps** — Streamlit (Python) + Next.js (TypeScript)
- 💊 **Treatment Recommendations** — symptoms, severity, and suggested intervention per disease

---

## 🌐 Web Platform & Features

The Perdix Origin web platform is a **production-grade Next.js 16 application** with 20+ pages, real-time AI inference, and enterprise-level UX.

### Pages & Modules

| Page | Route | Description |
|---|---|---|
| 🏠 **Home** | `/` | Landing page with animated carousel, tech stack, and team section |
| 🧠 **Alzheimer AI** | `/alzheimer-ai` | Overview page for the 4-level diagnostic system |
| 📊 **Clinical Dashboard** | `/alzheimer-ai/dashboard` | Full diagnostic interface with MRI upload + PDF export |
| 🧬 **Genomics Explorer** | `/alzheimer-ai/genomics` | Interactive polygenic risk profiler |
| 🤖 **AI Services** | `/servicios-ia` | OpenAI Brains, SRI Intelligence, and corporate AI solutions |
| 🌎 **Impact Cases** | `/impacto` | AgroTech Vision + Safety Analytics showcase |
| ⚡ **Automation** | `/soluciones/automatizacion` | Google Workspace automation ecosystem |
| 🌐 **Web Solutions** | `/soluciones/web` | Web app development services |
| 🏗️ **Infrastructure** | `/soluciones/infraestructura` | Cloud, databases, and server architecture |
| 💰 **Pricing** | `/pricing` | Enterprise pricing tiers with Stripe integration |
| 📧 **Contact** | `/contacto` | Contact form with business inquiry routing |
| 🔐 **Login** | `/login` | Authentication portal |
| 📊 **Dashboard** | `/dashboard` | User management dashboard |
| 🧮 **Calculator** | `/calculadora` | ROI and cost estimation tool |
| 🔌 **APIs** | `/apis` | API documentation and playground |
| 🎤 **Pitch** | `/pitch` | Hult Prize presentation viewer |
| 💼 **Talent** | `/talent` | Team and recruitment page |
| 🌐 **Impact (EN)** | `/impact` | English-language impact page |

### Shared Components

| Component | Description |
|---|---|
| `Navbar` | Responsive navigation with glassmorphism effect |
| `Footer` | Corporate footer with Perdix branding |
| `BrainAssistant` | AI-powered floating assistant (OpenAI GPT-4) |
| `TechParticles` | Animated particle background system |
| `BrandAssets` | SVG logos (MainLogo, PartridgeWatermark, StarWatermark) |
| `Team` | Team member cards with image fallbacks |

---

## 🔌 API Endpoints

The platform exposes **12 API routes** for AI inference, payments, and security:

| Endpoint | Method | Description |
|---|---|---|
| `/api/diagnose` | POST | Alzheimer AI diagnostic engine (v4.0) — MRI classification + clinical fallback |
| `/api/chat` | POST | AI assistant powered by OpenAI GPT-4o |
| `/api/perdix-engine` | POST | Core Perdix AI reasoning engine |
| `/api/sri` | POST | SRI tax intelligence analysis |
| `/api/audit` | POST | Automated security auditing |
| `/api/security` | POST | Threat analysis and vulnerability scanning |
| `/api/checkout` | POST | Stripe payment session creation |
| `/api/stripe/webhook` | POST | Stripe webhook handler |
| `/api/verify-openai` | GET | OpenAI API key validation |
| `/api/skills` | GET | Skills management endpoint |
| `/api/projects` | GET | Project portfolio API |
| `/api/logs` | GET | System logging endpoint |

### Diagnose API — Technical Details

The Alzheimer diagnostic engine (`/api/diagnose`) implements a multi-strategy approach:

1. **HuggingFace Inference** — Primary: EfficientNetB0 model deployed on HuggingFace Spaces
2. **Clinical Fallback** — Secondary: Local algorithm using MMSE score + hippocampal volume
3. **Risk Scoring** — Calibrated risk percentage based on classification + clinical data
4. **Therapeutic Output** — Personalized intervention plan with diet and exercise recommendations

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router |
| **React** | 19.2.3 | UI component library |
| **Tailwind CSS** | v4 | Utility-first styling |
| **Framer Motion** | 12.x | Animations and transitions |
| **Recharts** | 3.x | Data visualization |
| **Lucide React** | 0.564 | Icon system |
| **jsPDF** | 4.x | Client-side PDF generation |

### Backend & AI

| Technology | Purpose |
|---|---|
| **OpenAI GPT-4o** | Natural language AI assistant and clinical interpretation |
| **HuggingFace Inference API** | MRI classification model serving |
| **TensorFlow / Keras** | Deep learning model training |
| **MedGemma 4B** | Medical image + text interpretation (Google Health) |
| **XGBoost** | Clinical risk prediction |
| **EfficientNetB0** | MRI vision classification (transfer learning) |
| **MobileNetV2** | Banana disease classification (transfer learning) |

### Infrastructure

| Technology | Purpose |
|---|---|
| **Vercel** | Production deployment and CDN |
| **Google Cloud Platform** | Compute, storage, and AI APIs |
| **Stripe** | Payment processing |
| **HuggingFace Spaces** | ML model hosting |

### Languages

| Language | Usage |
|---|---|
| **TypeScript** | Frontend, API routes, components |
| **Python** | ML training, data processing, automation scripts |
| **CSS** | Tailwind v4 with custom design system |

---

## 🏗️ Arquitectura Técnica

```
perdix-origin/
├── 📁 app/                          # Next.js 16 App Router
│   ├── 📁 alzheimer-ai/             # Alzheimer AI module
│   │   ├── page.tsx                 #   Overview page
│   │   ├── 📁 dashboard/            #   Clinical dashboard
│   │   └── 📁 genomics/             #   Genomic risk profiler
│   ├── 📁 api/                      # 12 API endpoints
│   │   ├── 📁 diagnose/             #   AI diagnostic engine
│   │   ├── 📁 chat/                 #   GPT-4 assistant
│   │   ├── 📁 perdix-engine/        #   Core AI engine
│   │   ├── 📁 sri/                  #   Tax intelligence
│   │   ├── 📁 stripe/               #   Payment webhooks
│   │   └── 📁 security/             #   Threat analysis
│   ├── 📁 components/               # Shared React components
│   │   ├── Navbar.tsx               #   Navigation
│   │   ├── Footer.tsx               #   Footer
│   │   ├── BrainAssistant.tsx       #   AI floating assistant
│   │   ├── TechParticles.tsx        #   Particle animations
│   │   ├── BrandAssets.tsx          #   SVG logos
│   │   └── Team.tsx                 #   Team cards
│   ├── 📁 servicios-ia/             # AI services page
│   ├── 📁 impacto/                  # Impact cases
│   ├── 📁 soluciones/               # Business solutions
│   │   ├── 📁 automatizacion/       #   Google automation
│   │   ├── 📁 web/                  #   Web development
│   │   └── 📁 infraestructura/      #   Cloud infrastructure
│   ├── 📁 pricing/                  # Stripe pricing tiers
│   ├── 📁 contacto/                 # Contact form
│   ├── 📁 login/                    # Authentication
│   ├── layout.tsx                   # Root layout (Manrope font)
│   ├── globals.css                  # Design system
│   ├── sitemap.ts                   # SEO sitemap
│   └── robots.ts                    # SEO robots
│
├── 📁 alzheimer-ai/                 # ML Research & Training
│   ├── AlzheimerAI_Training_FINAL_Cero_Dummies.ipynb
│   ├── MedGemma_Alzheimer_Analysis_FINAL.ipynb
│   ├── ADNI_Multimodal_Fusion.ipynb
│   ├── AlzheimerAI_Clinical_Prediction.ipynb
│   ├── AlphaGenome_Alzheimer_Demo.py
│   ├── 📁 server/                   # AI inference server
│   └── README.md
│
├── 📁 03_banana_disease_detection/  # AgroTech Vision Module
│   ├── 📁 src/                      # Training pipeline
│   ├── 📁 notebooks/                # Colab notebooks
│   ├── 📁 webapp/                   # Streamlit web app
│   ├── 📁 webapp-pro/               # Next.js web app
│   ├── banana_disease_model.keras   # Trained model
│   └── README.md
│
├── 📁 chrome-extension/             # PerdixBrain Browser Extension
│   ├── manifest.json                # Chrome Manifest v3
│   ├── background.js                # Service worker
│   ├── content.js                   # Content scripts
│   └── popup.html                   # Extension popup UI
│
├── 📁 lib/                          # Shared utilities
├── 📁 models/                       # Data models
├── 📁 public/                       # Static assets
├── 📁 styles/                       # Global styles
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **Python** ≥ 3.10 (for ML notebooks)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/erick007bon/perdix-origin.git
cd perdix-origin

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys:
# OPENAI_API_KEY=sk-...
# HUGGINGFACE_API_TOKEN=hf_...
# STRIPE_SECRET_KEY=sk_...

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform.

### Running the ML Notebooks

```bash
# Navigate to the Alzheimer AI module
cd alzheimer-ai

# Or use Google Colab — open any .ipynb file directly
```

### Running Banana Disease Detection

```bash
cd 03_banana_disease_detection

# Python version (Streamlit)
pip install -r requirements.txt
cd webapp && streamlit run app.py

# TypeScript version (Next.js)
cd webapp-pro && npm install && npm run dev
```

---

## ☁️ Deployment

The platform is deployed on **Vercel** with automatic builds from the `main` branch:

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

---

## 🏆 Achievements

- 🥇 **Hult Prize Regional Winner** — Presented Perdix Vision as a solution for Alzheimer's detection in underserved communities
- 🏥 **Designed for Ecuador's healthcare system** — Piloting with Hospital Luis Vernaza and Instituto de Neurociencias (Guayaquil)
- 💰 **$64,000 USD estimated savings per patient** through early detection
- 🧬 **Pioneer in combining MRI + Genomics + MedGemma** for a unified diagnostic pipeline in Latin America

---

## 👤 Author

<div align="center">

### **Erick Zambrano**

*Software Engineer · AI Researcher · Hult Prize Winner*

🇪🇨 Ecuador · 2026

[![GitHub](https://img.shields.io/badge/GitHub-erick007bon-181717?style=for-the-badge&logo=github)](https://github.com/erick007bon)

</div>

---

<div align="center">

### 🦅 *"Engineering Global Impact — One Algorithm at a Time."*

**Perdix Origin** · Built with 🖤 in Ecuador

⭐ **If this project inspires you, give it a star!**

</div>
