# 🧠 Project Context: AlzheimerAI — Perdix Vision 2026

## Objective
This is a real-world medical project for the **Hult Prize 2026**, aligned with **SDG 3 (Good Health & Wellbeing)**. The goal is the early detection of Alzheimer's disease using a multi-level AI approach.

## Structure of provided Notebooks
You have been provided with two main Jupyter Notebooks that have been audited and fixed to run seamlessly:

### 1. `AlzheimerAI_Training_v2.ipynb` (Level 1: MRI Classification)
*   **Legacy Context:** Originally designed for fine-tuning EfficientNetB0 locally. 
*   **Current Production Architecture:** This notebook approach is now DEPRECATED for the real-time Vercel integration. We successfully decoupled the Heavy AI. Vercel now points to a **Hugging Face Space** API (`erick6655-perdix`) running a FastAPI Python server.
*   **Active Core:** The Hugging Face server runs a pre-trained Vision Transformer (`prithivMLmods/Alzheimer-Stage-Classifier`) via PyTorch `transformers` pipeline to analyze uploaded JPEGs/PNGs of brain sans, returning realistic probability breakdowns. 
*   **Status:** The Python code for this backend lives in `/huggingface_ready`. Do not try to retrain local `.keras` dummies. Use the active HF API.

### 2. `MedGemma_Alzheimer_Analysis.ipynb` (Level 3: Expert Interpretation)
*   **Purpose:** Uses **MedGemma 4B** (Google) to generate detailed clinical reports in Spanish from MRI scans.
*   **Key Features:** Automated prompt engineering for neurology, hippocampal atrophy detection, and combined pipeline logic.
*   **Status:** AUDITED. Fixed for Colab environment (disabled noisy HF progress bars, removed incompatible emojis from Matplotlib titles, fixed cell dependency errors).

## Instructions for the AI Assistant
1.  **Environment:** Ensure you are using a **GPU (T4 recommended)** for both notebooks.
2.  **Auth:** MedGemma requires a HuggingFace token with access to `google/medgemma-4b-it`.
3.  **Execution:** You can execute "Run All" on both notebooks without manual intervention.
4.  **Verification:** 
    *   In Level 1, verify the Evaluation Report and Grad-CAM visualizations at the end.
    *   In Level 3, verify that MedGemma provides coherent medical reports in Spanish.
5.  **Integration:** The final goal is to take the `.keras` model from Level 1 and the MedGemma logic from Level 3 to integrate them into a Next.js + FastAPI web platform (Level 4).

---
**"Early detection gives families TIME." — Perdix Vision 2026**
