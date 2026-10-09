"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Activity, 
  UploadCloud, 
  BrainCircuit, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  FileText,
  Stethoscope,
  XCircle,
  Info
} from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import { TechParticles } from "../../components/TechParticles";

export default function ClinicalDashboard() {
  const [formData, setFormData] = useState({
    age: 65,
    bmi: 24.5,
    cognitive_test_score: 25,
    epigenetic_risk_score: 0.1,
    brain_volume_cm3: 1100,
    hippocampus_volume_cm3: 6.5
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notBrainError, setNotBrainError] = useState<string | null>(null);
  
  // Fase 4: Ecosistema Terapéutico
  const [therapeuticPlan, setTherapeuticPlan] = useState<string | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const generateTherapeuticPlan = async () => {
    setGeneratingPlan(true);
    
    try {
      // LLAMADA REAL A LA API ABIERTA DE LA FDA (Gobierno de USA)
      const res = await fetch('https://api.fda.gov/drug/label.json?search=indications_and_usage:"alzheimer"&limit=1');
      if (!res.ok) throw new Error("FDA API Limit");
      const fdaData = await res.json();
      
      const drug = fdaData.results[0];
      const brandName = drug.openfda?.brand_name?.[0] || 'Donepezilo / Memantina';
      const genericName = drug.openfda?.generic_name?.[0] || 'Desconocido';
      const route = drug.openfda?.route?.[0] || 'Oral';
      
      const indicationText = drug.indications_and_usage?.[0]?.substring(0, 250) || 'Tratamiento indicado para demencia tipo Alzheimer.';
      const warnings = drug.warnings?.[0]?.substring(0, 150) || 'Monitorear respuesta cardiovascular a inhibidores de colinesterasa.';

      setTherapeuticPlan(`Fuente: API OpenFDA del Gobierno de EE.UU. (datos reales verificables)
      
• Fármaco de Referencia: ${brandName} (${genericName})
• Vía de Administración: ${route}
• Indicación Oficial FDA: ${indicationText}...
• Precauciones: ${warnings}...

⚠️ Nota: Esta información proviene de la base de datos pública de la FDA. NO sustituye la evaluación presencial de un neurólogo.`);
    } catch (e) {
      // Fallback - Indicar claramente que es información de referencia general
      const riesgo = result?.risk_score_exact || 0;
      const predCode = result?.prediction_code || "UNKNOWN";
      
      let recoTerapeutica = "";
      if (predCode === "AD-Moderate" || riesgo > 0.6) {
          recoTerapeutica = `• Según guías clínicas (NIA-AA): Los inhibidores de colinesterasa (Donepezilo, Rivastigmina) son primera línea de tratamiento.
• Para casos moderados: combinación con Memantina puede ser considerada.
• Se recomienda derivación urgente a Neurología Cognitiva para evaluación presencial.`;
      } else if (predCode === "AD-Mild" || predCode === "MCI" || riesgo > 0.25) {
          recoTerapeutica = `• Según guías NIA-AA: El deterioro cognitivo leve requiere monitoreo estrecho cada 6 meses.
• Intervenciones de primera línea: ejercicio aeróbico (150 min/semana), estimulación cognitiva, dieta MIND.
• Considerar evaluación neuropsicológica completa para establecer línea base.`;
      } else {
          recoTerapeutica = `• No se detectan patrones de atrofia significativa en la imagen analizada.
• Recomendaciones preventivas: mantener actividad física regular, dieta mediterránea, estimulación cognitiva.
• Seguimiento preventivo anual recomendado para personas con factores de riesgo.`;
      }

      setTherapeuticPlan(`Sugerencias Clínicas (basadas en guías NIA-AA publicadas)

${recoTerapeutica}

⚠️ Nota: Estas sugerencias se basan en guías clínicas publicadas, NO en un análisis individual del caso. Requieren validación por un especialista.`);
    } finally {
      setGeneratingPlan(false);
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 15;

      // === HEADER ===
      pdf.setFillColor(88, 28, 135); // purple-900
      pdf.rect(0, 0, pageWidth, 38, 'F');
      
      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.text("REPORTE CLÍNICO — PERDIX ORIGIN AI", margin, 18);
      
      pdf.setFontSize(9);
      pdf.setTextColor(200, 200, 255);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Fecha: ${new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, 26);
      pdf.text(`ID Diagnóstico: ${result?.diagnosis_id || 'N/A'}`, margin, 32);
      pdf.text(`Motor: ${result?.model_source || 'Perdix ADNI Engine'}`, pageWidth - margin - 80, 26);
      pdf.text(`Tipo: ${result?.model_type || 'CNN + XGBoost'}`, pageWidth - margin - 80, 32);

      y = 48;

      // === DATOS DEL PACIENTE ===
      pdf.setFontSize(12);
      pdf.setTextColor(88, 28, 135);
      pdf.setFont("helvetica", "bold");
      pdf.text("DATOS DEL PACIENTE", margin, y);
      y += 2;
      pdf.setDrawColor(88, 28, 135);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, margin + contentWidth, y);
      y += 7;

      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);
      pdf.setFont("helvetica", "normal");
      
      const patientData = [
        [`Edad: ${formData.age} años`, `BMI: ${formData.bmi}`],
        [`Puntaje Cognitivo (MMSE): ${formData.cognitive_test_score}/30`, `Volumen Hipocampo: ${formData.hippocampus_volume_cm3} cm³`],
      ];
      
      patientData.forEach(row => {
        pdf.text(row[0], margin, y);
        pdf.text(row[1], margin + contentWidth / 2, y);
        y += 6;
      });

      y += 5;

      // === CLASIFICACIÓN PRINCIPAL ===
      pdf.setFillColor(245, 245, 255);
      pdf.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');
      
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "bold");
      pdf.text("CLASIFICACIÓN DEL MODELO IA", margin + contentWidth / 2, y + 7, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setTextColor(30, 30, 30);
      pdf.text(result?.prediction_class || "No clasificado", margin + contentWidth / 2, y + 17, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Confianza: ${result?.confidence_score?.toFixed(1) || 0}%`, margin + contentWidth / 2, y + 25, { align: 'center' });
      
      const riskPct = ((result?.risk_score_exact || 0) * 100).toFixed(1);
      pdf.setFontSize(9);
      pdf.text(`Nivel de Riesgo: ${riskPct}% (${result?.risk_level || 'N/A'})`, margin + contentWidth / 2, y + 31, { align: 'center' });
      
      y += 42;

      // === BARRA DE RIESGO ===
      pdf.setFontSize(10);
      pdf.setTextColor(88, 28, 135);
      pdf.setFont("helvetica", "bold");
      pdf.text("NIVEL DE RIESGO", margin, y);
      y += 6;

      // Barra de fondo
      pdf.setFillColor(230, 230, 230);
      pdf.roundedRect(margin, y, contentWidth, 6, 2, 2, 'F');
      
      // Barra de riesgo con color según nivel
      const riskValue = result?.risk_score_exact || 0;
      const barWidth = Math.max(contentWidth * riskValue, 2);
      if (riskValue > 0.6) pdf.setFillColor(220, 38, 38); // rojo
      else if (riskValue > 0.25) pdf.setFillColor(245, 158, 11); // naranja
      else pdf.setFillColor(16, 185, 129); // verde
      pdf.roundedRect(margin, y, barWidth, 6, 2, 2, 'F');
      
      pdf.setFontSize(8);
      pdf.setTextColor(50, 50, 50);
      pdf.text(`${riskPct}%`, margin + barWidth + 3, y + 4.5);
      
      y += 14;

      // === DISTRIBUCIÓN DE PROBABILIDADES ===
      if (result?.breakdown) {
        pdf.setFontSize(10);
        pdf.setTextColor(88, 28, 135);
        pdf.setFont("helvetica", "bold");
        pdf.text("DISTRIBUCIÓN DE PROBABILIDADES", margin, y);
        y += 7;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        Object.entries(result.breakdown).forEach(([label, score]: [string, any]) => {
          pdf.setTextColor(80, 80, 80);
          pdf.text(`${label}:`, margin, y);
          
          // Mini barra
          pdf.setFillColor(230, 230, 230);
          pdf.rect(margin + 45, y - 3, 80, 4, 'F');
          if (score > 50) pdf.setFillColor(147, 51, 234); // purple
          else pdf.setFillColor(180, 180, 180);
          pdf.rect(margin + 45, y - 3, Math.max(80 * (score / 100), 1), 4, 'F');
          
          pdf.setTextColor(30, 30, 30);
          pdf.setFont("helvetica", "bold");
          pdf.text(`${score}%`, margin + 130, y);
          pdf.setFont("helvetica", "normal");
          y += 6;
        });
        y += 4;
      }

      // === INTERPRETACIÓN CLÍNICA ===
      pdf.setFontSize(10);
      pdf.setTextColor(88, 28, 135);
      pdf.setFont("helvetica", "bold");
      pdf.text("INTERPRETACIÓN CLÍNICA", margin, y);
      y += 2;
      pdf.setDrawColor(88, 28, 135);
      pdf.line(margin, y, margin + contentWidth, y);
      y += 6;

      pdf.setFontSize(9);
      pdf.setTextColor(50, 50, 50);
      pdf.setFont("helvetica", "normal");
      const recLines = pdf.splitTextToSize(result?.recommendation || "Sin recomendación disponible.", contentWidth);
      pdf.text(recLines, margin, y);
      y += recLines.length * 4.5 + 5;

      // === REFERENCIAS TERAPÉUTICAS ===
      if (therapeuticPlan) {
        if (y > 240) { pdf.addPage(); y = 20; }
        
        pdf.setFontSize(10);
        pdf.setTextColor(16, 185, 129);
        pdf.setFont("helvetica", "bold");
        pdf.text("REFERENCIAS TERAPÉUTICAS", margin, y);
        y += 6;

        pdf.setFontSize(8);
        pdf.setTextColor(50, 50, 50);
        pdf.setFont("helvetica", "normal");
        const therapLines = pdf.splitTextToSize(therapeuticPlan, contentWidth);
        pdf.text(therapLines, margin, y);
        y += therapLines.length * 3.5 + 5;
      }

      // === DISCLAIMER ===
      if (y > 255) { pdf.addPage(); y = 20; }
      
      pdf.setFillColor(255, 245, 230);
      pdf.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
      pdf.setFontSize(7);
      pdf.setTextColor(150, 100, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text("⚠ AVISO LEGAL", margin + 3, y + 5);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);
      const disclaimer = "Este reporte es generado por un modelo de inteligencia artificial con fines investigativos y educativos. NO constituye un diagnóstico médico. Los resultados deben ser interpretados por un profesional de la salud calificado. Perdix Origin no se responsabiliza por decisiones clínicas basadas exclusivamente en este reporte.";
      const discLines = pdf.splitTextToSize(disclaimer, contentWidth - 6);
      pdf.text(discLines, margin + 3, y + 10);

      // === FOOTER ===
      const pageH = pdf.internal.pageSize.getHeight();
      pdf.setFontSize(7);
      pdf.setTextColor(150, 150, 150);
      pdf.text("Generado por Perdix Origin AI — ingenieria-platform.vercel.app", margin, pageH - 8);
      pdf.text(`© ${new Date().getFullYear()} Perdix Origin. Todos los derechos reservados.`, pageWidth - margin - 65, pageH - 8);

      // GUARDAR
      pdf.save(`Perdix_Reporte_Clinico_${result?.diagnosis_id || 'EXPORT'}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF. Intente nuevamente.");
    }
    setIsExporting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setNotBrainError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setErrorMessage(null);
    setNotBrainError(null);
    setTherapeuticPlan(null);

    try {
      const submitData = new FormData();
      submitData.append("age", formData.age.toString());
      submitData.append("cognitive_test_score", formData.cognitive_test_score.toString());
      submitData.append("hippocampus_volume_cm3", formData.hippocampus_volume_cm3.toString());
      
      if (imageFile) {
          submitData.append("mri_scan", imageFile);
      } else {
          throw new Error("Debe seleccionar un Scan MRI o PET obligatoriamente.");
      }
    
      const response = await fetch("/api/diagnose", {
        method: "POST",
        body: submitData
      });

      const data = await response.json();

      // Manejar rechazo por no ser imagen cerebral
      if (data.is_brain_scan === false || data.status === "rejected") {
        setNotBrainError(data.error || "La imagen proporcionada no parece ser un scan cerebral MRI/PET.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Error en la conexión con el motor IA");
      }
      
      setResult(data);

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Fallo crítico en el Motor IA.";
      console.error("[Dashboard Error]:", message);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  // Helper para mostrar el risk score de forma segura (nunca NaN)
  const getRiskDisplay = () => {
    if (!result) return { percentage: "0.0", color: "from-gray-400 to-gray-500", barColor: "bg-gray-500" };
    const score = typeof result.risk_score_exact === 'number' && !isNaN(result.risk_score_exact) 
      ? result.risk_score_exact 
      : 0;
    const pct = (score * 100).toFixed(1);
    if (score > 0.6) return { percentage: pct, color: "from-red-500 to-orange-500", barColor: "bg-red-500" };
    if (score > 0.25) return { percentage: pct, color: "from-orange-500 to-yellow-500", barColor: "bg-orange-500" };
    return { percentage: pct, color: "from-emerald-400 to-teal-400", barColor: "bg-emerald-500" };
  };

  const risk = getRiskDisplay();

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <TechParticles />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/alzheimer-ai" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                ← Volver a Arquitectura
              </Link>
            </div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
              <BrainCircuit className="h-10 w-10 text-purple-500" />
              Terminal de Diagnóstico
            </h1>
            <p className="text-gray-400 mt-2">
              Motor multimodal respaldado por el estudio DOMITILA (<span className="text-white font-medium">5,078 pacientes, OASIS-3 + ADNI, C = 0.741</span>).
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="/alzheimer-assets/DOMITILA_Scientific_Paper_JPAD.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/40 px-3 py-2 rounded-xl hover:bg-cyan-900/60 transition-all flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" /> Paper Científico (PDF)
            </a>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">DOMITILA Engine v4.2</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULARIO */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/50 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Activity className="h-5 w-5 text-blue-400" /> Datos del Paciente
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Edad</label>
                    <input 
                      type="number" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">BMI (Índice Masa Corp.)</label>
                    <input 
                      type="number" 
                      name="bmi"
                      step="0.1"
                      value={formData.bmi}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Puntaje Cognitivo (MMSE)</label>
                    <input 
                      type="number" 
                      name="cognitive_test_score"
                      value={formData.cognitive_test_score}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volumen Hipocampo (cm³)</label>
                    <input 
                      type="number" 
                      name="hippocampus_volume_cm3"
                      step="0.1"
                      value={formData.hippocampus_volume_cm3}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subida de MRI */}
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-widest">Scan MRI / PET Cerebral</h3>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp,image/tiff,image/bmp" 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border-2 border-dashed ${notBrainError ? 'border-red-500 bg-red-500/10' : imagePreview ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-black/30 hover:border-white/40'} rounded-2xl p-8 text-center transition-all overflow-hidden relative`}>
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imagePreview} alt="MRI Scan Preview" className="h-32 object-contain mix-blend-screen mb-4 rounded-lg" />
                          {notBrainError ? (
                            <span className="text-red-400 font-bold flex items-center gap-2"><XCircle className="h-4 w-4"/> No es un Scan Cerebral</span>
                          ) : (
                            <span className="text-purple-400 font-bold flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/> Scan Seleccionado</span>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <UploadCloud className="h-10 w-10 text-gray-500 mb-3 group-hover:scale-110 transition-transform" />
                          <span className="text-gray-400 font-medium">Subir resonancia cerebral (JPEG, PNG, TIFF)</span>
                          <span className="text-gray-600 text-xs mt-1">Solo scans cerebrales MRI/PET — otras imágenes serán rechazadas</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Error de imagen no cerebral */}
                  {notBrainError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-300 font-bold text-sm">Imagen No Válida</p>
                        <p className="text-red-400/80 text-xs mt-1">{notBrainError}</p>
                        <p className="text-gray-500 text-xs mt-2">Suba una imagen de resonancia magnética (MRI) o tomografía (PET) del cerebro. Fotos de personas, objetos u otras imágenes no médicas no son compatibles con el modelo.</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-lg py-4 rounded-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-3"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin h-6 w-6" /> Clasificando con IA...</>
                    ) : (
                      <><BrainCircuit className="h-6 w-6" /> Analizar Scan con Modelo IA</>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>

          {/* RESULTADOS */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-950 border border-white/5 rounded-[2rem] p-8 h-full flex flex-col relative"
            >
               {!result && !loading && !errorMessage && (
                 <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                    <ShieldCheck className="h-16 w-16 text-gray-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-300">Esperando Scan</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-[250px]">Suba un scan MRI cerebral y ejecute el análisis para recibir la clasificación del modelo.</p>
                 </div>
               )}

               {errorMessage && !loading && (
                 <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-red-400">Error en el Motor IA</h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-[280px] leading-relaxed">{errorMessage}</p>
                    <button
                      onClick={() => setErrorMessage(null)}
                      className="mt-4 text-xs text-gray-500 underline hover:text-white transition-colors"
                    >
                      Reintentar
                    </button>
                 </div>
               )}

               {loading && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="h-20 w-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-bold animate-pulse text-purple-400">Analizando...</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-4">Procesando imagen con motor de clasificación IA</p>
                  </div>
               )}

               {result && !loading && (
                 <motion.div 
                   id="medical-report-pdf-area"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex-1 flex flex-col bg-neutral-950 p-2 sm:p-4 rounded-xl"
                 >
                    <div className="mb-6 flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black tracking-widest uppercase text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Resultado del Modelo IA</span>
                        <h3 className="text-3xl font-black mt-3">Clasificación</h3>
                        <p className="text-xs text-gray-500 mt-1">ID: {result.diagnosis_id}</p>
                      </div>
                    </div>

                    {/* Badge de fuente del modelo */}
                    <div className={`mb-4 flex items-center gap-2 rounded-lg px-3 py-2 ${
                      result.fallback_reason 
                        ? 'bg-amber-900/20 border border-amber-500/30' 
                        : 'bg-blue-900/20 border border-blue-500/30'
                    }`}>
                      <Info className={`h-3.5 w-3.5 flex-shrink-0 ${
                        result.fallback_reason ? 'text-amber-400' : 'text-blue-400'
                      }`} />
                      <span className={`text-[10px] font-medium ${
                        result.fallback_reason ? 'text-amber-300' : 'text-blue-300'
                      }`}>
                        {result.fallback_reason 
                          ? `⚡ ${result.model_source} — Motor remoto no disponible, clasificación basada en datos clínicos`
                          : `Fuente: ${result.model_source || "Hugging Face"} — Modelo CNN entrenado con dataset real de MRI Alzheimer`
                        }
                      </span>
                    </div>

                    {/* Clasificación Principal */}
                    <div className="bg-black/50 rounded-2xl p-6 border border-white/5 mb-6 text-center">
                        <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Clasificación del Modelo</span>
                        <div className="text-2xl font-black text-white mb-2">
                          {result.prediction_class || "No Clasificado"}
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                          Confianza: <span className="text-white font-bold">{result.confidence_score?.toFixed(1) || 0}%</span>
                        </div>
                        
                        {/* Risk Score */}
                        <span className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2 mt-4">Nivel de Riesgo</span>
                        <div className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r mb-4 ${risk.color}`}>
                           {risk.percentage}%
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }} 
                             animate={{ width: `${risk.percentage}%` }} 
                             transition={{ duration: 1, type: "spring" }}
                             className={`h-full ${risk.barColor}`} 
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                           <AlertTriangle className={`h-4 w-4 ${(result.risk_score_exact || 0) > 0.6 ? 'text-red-500' : 'text-gray-500'}`} />
                           <span className="font-bold">{result.risk_level || "LOW"}</span>
                        </div>
                    </div>

                    {/* Breakdown de probabilidades */}
                    {result.breakdown && (
                      <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/5">
                        <span className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">Distribución de Probabilidades</span>
                        <div className="space-y-2">
                          {Object.entries(result.breakdown).map(([label, score]: [string, any]) => (
                            <div key={label} className="flex items-center gap-3">
                              <span className="text-xs text-gray-400 w-28 text-right font-medium">{label}</span>
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all ${score > 50 ? 'bg-purple-500' : 'bg-white/20'}`} 
                                  style={{ width: `${Math.min(score, 100)}%` }} 
                                />
                              </div>
                              <span className="text-xs text-white font-bold w-14">{score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recomendación */}
                    <div className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
                        <span className="block text-purple-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                           <BrainCircuit className="h-4 w-4" /> Interpretación Clínica
                        </span>
                        <p className="text-gray-300 font-medium leading-relaxed text-sm">
                           {result.recommendation}
                        </p>
                    </div>
                    
                    {/* Sección Terapéutica */}
                    {therapeuticPlan ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-6 mb-6 relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl" />
                         <span className="block text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" /> Referencias Terapéuticas
                         </span>
                         <div className="text-gray-200 text-sm whitespace-pre-line leading-relaxed font-medium">
                           {therapeuticPlan}
                         </div>
                      </motion.div>
                    ) : (
                      <div className="mb-6 flex gap-4">
                        <button 
                          onClick={generateTherapeuticPlan}
                          disabled={generatingPlan}
                          className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2"
                        >
                          {generatingPlan ? <Loader2 className="animate-spin h-5 w-5 text-emerald-400" /> : <Stethoscope className="h-5 w-5 text-emerald-400" />}
                          {generatingPlan ? "Consultando FDA..." : "Ver Referencias Terapéuticas"}
                        </button>
                      </div>
                    )}
                 </motion.div>
               )}
               
               {/* Footer Actions */}
               {result && !loading && (
                 <div className="mt-auto border-t border-white/10 pt-6">
                    <button 
                       onClick={exportPDF}
                       disabled={isExporting}
                       className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
                    >
                       {isExporting ? <Loader2 className="animate-spin h-5 w-5" /> : <FileText className="h-5 w-5" />}
                       {isExporting ? "Generando PDF..." : "Exportar Reporte a PDF"}
                    </button>
                 </div>
               )}
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  );
}
