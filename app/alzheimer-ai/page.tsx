"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Dna, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  Microscope, 
  Clock, 
  ShieldAlert,
  Zap,
  Globe,
  LineChart
} from "lucide-react";
import Link from "next/link";
import { TechParticles } from "../components/TechParticles";

export default function AlzheimerAIPage() {
  const levels = [
    {
      id: 1,
      title: "Vision MRI",
      model: "EfficientNetB0",
      desc: "Análisis volumétrico de hipocampo y detección de atrofia cortical con Grad-CAM.",
      icon: <Brain className="h-8 w-8 text-red-500" />,
      color: "from-red-500/20 to-transparent",
      border: "hover:border-red-500/30"
    },
    {
      id: 2,
      title: "AlphaGenome",
      model: "Google DeepMind",
      desc: "Predicción funcional de variantes genéticas e indicadores PRS pre-sintomáticos.",
      icon: <Dna className="h-8 w-8 text-blue-500" />,
      color: "from-blue-500/20 to-transparent",
      border: "hover:border-blue-500/30"
    },
    {
      id: 3,
      title: "MedGemma",
      model: "Google Health",
      desc: "Interpretación clínica experta en español y generación de reportes HL7.",
      icon: <Stethoscope className="h-8 w-8 text-purple-500" />,
      color: "from-purple-500/20 to-transparent",
      border: "hover:border-purple-500/30"
    },
    {
      id: 4,
      title: "XGBoost Clinical",
      model: "Predictor de Hábitos",
      desc: "Análisis de estilo de vida, dieta MIND y factores de riesgo metabólico.",
      icon: <Activity className="h-8 w-8 text-emerald-500" />,
      color: "from-emerald-500/20 to-transparent",
      border: "hover:border-emerald-500/30"
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pt-20 overflow-hidden">
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <TechParticles />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <img 
              src="/mystery-star.png" 
              alt="" 
              className="w-full h-full object-contain animate-spin-slow opacity-20 mix-blend-screen"
            />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        
        {/* HERO SECTION */}
        <section className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-10 backdrop-blur-xl">
              <Zap className="h-3 w-3 fill-purple-400" /> Hult Prize 2026 Strategy
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              Alzheimer<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto font-medium leading-relaxed mb-12">
              Plataforma de asistencia diagnóstica exclusiva para <span className="text-white">Neurólogos y Especialistas Médicos</span>. Integra una arquitectura 
              de <span className="text-white">4 niveles</span> impulsada por los modelos 
              de IA más avanzados del mundo.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
                <Link href="#arch" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                  Explorar Arquitectura
                </Link>
                <Link href="/alzheimer-ai/dashboard" className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all backdrop-blur-xl flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" /> Entrar al Dashboard
                </Link>
            </div>
          </motion.div>
        </section>

        {/* ARCHITECTURE BENTO GRID */}
        <section id="arch" className="mb-60">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {levels.map((level, idx) => (
                    <motion.div
                        key={level.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/5 ${level.border} transition-all overflow-hidden h-full flex flex-col justify-between`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                        
                        <div className="relative z-10">
                            <div className="mb-12 p-5 bg-black/40 rounded-2xl w-fit border border-white/5 scale-110">
                                {level.icon}
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2 block">{level.model}</span>
                            <h3 className="text-3xl font-black mb-6 leading-tight">Nivel {level.id}: <br />{level.title}</h3>
                            <p className="text-gray-400 font-medium leading-relaxed text-sm">
                                {level.desc}
                            </p>
                        </div>

                        <div className="mt-12 relative z-10 flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 group-hover:text-white transition-colors">
                            Ver Especificaciones <ArrowRight className="h-3 w-3" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* ALPHA GENOME DEEP DIVE */}
        <section className="mb-60 relative">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 text-blue-400 font-black tracking-widest uppercase text-xs mb-8">
                        <Microscope className="h-5 w-5" /> Nivel 2: Genómica Predictiva
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tight leading-tight">
                        Descifrando el <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Código de la Resiliencia</span>
                    </h2>
                    <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-2xl">
                        A través de una alianza conceptual con arquitecturas como <span className="text-white">AlphaGenome de Google DeepMind</span>, analizo variantes epigenéticas en regiones no codificantes del ADN.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <h4 className="text-white font-black text-lg mb-2">RNA-seq</h4>
                            <p className="text-gray-500 text-xs">Predicción de niveles de expresión génica en tejido cerebral.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                            <h4 className="text-white font-black text-lg mb-2">ATAC-seq</h4>
                            <p className="text-gray-500 text-xs">Análisis de accesibilidad de la cromatina alrededor de variantes raras.</p>
                        </div>
                    </div>

                    <Link href="/alzheimer-ai/genomics" className="group flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest">
                        Explorar Guía Genómica <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] border border-white/10 bg-neutral-900/50 p-4 shadow-2xl backdrop-blur-3xl overflow-hidden aspect-video flex items-center justify-center group"
                >
                     {/* DNA Animation / Fallback */}
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-black opacity-80" />
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530213786676-4189f1ec05ce?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-all duration-1000" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                     <div className="relative z-10 text-center">
                        <div className="h-20 w-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                        <span className="text-xs font-black tracking-[0.5em] uppercase text-blue-400">Analizando rs429358 (APOE)</span>
                     </div>
                </motion.div>
            </div>
        </section>

        {/* CLINICAL DASHBOARD PREVIEW */}
        <section className="mb-40">
            <div className="text-center mb-20">
                <span className="text-pink-500 font-black tracking-widest uppercase text-xs mb-4 block">Fase 2: Plataforma para Especialistas</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight">El Dashboard del Especialista</h2>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[4rem] border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-4 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* MRI Viewport */}
                    <div className="lg:col-span-7 bg-black rounded-[3rem] overflow-hidden aspect-square md:aspect-video relative border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2231&auto=format&fit=crop" 
                            className="w-full h-full object-cover opacity-60" 
                            alt="Brain Scan" 
                        />
                        <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay animate-pulse" />
                        <div className="absolute top-10 left-10 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10">
                            <span className="text-red-500 text-[10px] font-black uppercase flex items-center gap-2">
                                <ShieldAlert className="h-3 w-3" /> Grad-CAM: Atrofia Detectada
                            </span>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 flex-1">
                            <h5 className="text-gray-500 text-[10px] font-black uppercase mb-4">Análisis MedGemma</h5>
                            <p className="text-gray-300 font-medium leading-relaxed italic text-sm">
                                "Se observa ensanchamiento surcal pronunciado en regiones temporales. El volumen hipocampal está un 15% por debajo del percentil de edad..."
                            </p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-purple-500/10 border border-purple-500/20">
                            <div className="flex justify-between items-center mb-6">
                                <h5 className="text-purple-400 text-[10px] font-black uppercase">Riesgo Combinado</h5>
                                <span className="text-2xl font-black">84.2%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "84.2%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>

        {/* MODEL VALIDATION RESULTS */}
        <section className="mb-40">
            <div className="text-center mb-20">
                <span className="text-emerald-500 font-black tracking-widest uppercase text-xs mb-4 block">Validación Científica</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight">Rendimiento de los Modelos</h2>
                <p className="text-gray-400 text-xl font-medium mt-6 max-w-3xl mx-auto">
                    Nuestra arquitectura ha sido rigurosamente entrenada y probada. Aquí mostramos los resultados del motor real (EfficientNetB0 + XGBoost).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Grad-CAM */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] p-6 overflow-hidden relative group"
                >
                    <div className="aspect-square bg-black/50 rounded-2xl mb-6 relative overflow-hidden border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black z-0" />
                        <img src="/alzheimer-assets/gradcam_real.png" alt="Grad-CAM Hippocampal Atrophy Detection" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Interpretabilidad Grad-CAM</h3>
                    <p className="text-sm text-gray-400">Mapas de activación de calor muestran exactamente en qué regiones del hipocampo y corteza temporal se basa la IA para el diagnóstico.</p>
                </motion.div>

                {/* Confusion Matrix */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] p-6 overflow-hidden relative group"
                >
                    <div className="aspect-square bg-black/50 rounded-2xl mb-6 relative overflow-hidden border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black z-0" />
                        <img src="/alzheimer-assets/confusion_matrix_real.png" alt="Confusion Matrix — ADNI Dataset" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Matriz de Confusión</h3>
                    <p className="text-sm text-gray-400">Alta separación de clases entre "Non-Demented", "Very Mild", "Mild" y "Moderate". Las diagonales fuertes validan la fiabilidad.</p>
                </motion.div>

                {/* ROC Curves */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] p-6 overflow-hidden relative group"
                >
                    <div className="aspect-square bg-black/50 rounded-2xl mb-6 relative overflow-hidden border border-white/5 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0" />
                        <img src="/alzheimer-assets/roc_curves_real.png" alt="ROC Curves — Multi-class OvR" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="text-xl font-black mb-2">Precisión AUC-ROC</h3>
                    <p className="text-sm text-gray-400">Curvas ROC que alcanzan métricas cercanas a 1.0, demostrando una sensibilidad y especificidad de grado médico.</p>
                </motion.div>
            </div>
        </section>

        {/* MISSION STRATEGY */}
        <section className="text-center py-20 border-t border-white/5">
             <Globe className="h-20 w-20 text-white/10 mx-auto mb-10" />
             <h2 className="text-4xl font-black mb-8 leading-tight">
                "Early detection gives families <br /> 
                <span className="italic text-gray-500 underline decoration-white/20">TIME</span>."
             </h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Perdix Vision 2026 — Ecuador</p>
        </section>

      </div>
    </main>
  );
}
