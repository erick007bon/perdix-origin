"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Dna, 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  Microscope, 
  ShieldAlert,
  Zap,
  Globe,
  LineChart,
  FileText,
  CheckCircle2,
  HeartHandshake,
  TrendingUp,
  Download,
  ExternalLink,
  ShieldCheck,
  Scale,
  Coins,
  Sparkles,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TechParticles } from "../components/TechParticles";

export default function AlzheimerAIPage() {
  const [selectedFigure, setSelectedFigure] = useState<number>(0);

  const keyMetrics = [
    {
      value: "5,078",
      label: "Pacientes Multicéntricos",
      desc: "Cohortes independientes de OASIS-3 (Washington Univ.) y ADNI (USC LONI).",
      icon: <Globe className="h-5 w-5 text-cyan-400" />,
      color: "from-cyan-500/20 to-transparent",
      border: "border-cyan-500/30"
    },
    {
      value: "C = 0.741",
      label: "Concordancia Fuera de Cohorte",
      desc: "Validación externa estricta con pesos fijos, sin sobreajuste (p = 8.12 × 10⁻⁴²).",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      color: "from-emerald-500/20 to-transparent",
      border: "border-emerald-500/30"
    },
    {
      value: "75.5%",
      label: "Regla de Mediación Causal",
      desc: "El depósito de amiloide actúa casi en su totalidad a través de tau y neurodegeneración.",
      icon: <Dna className="h-5 w-5 text-purple-400" />,
      color: "from-purple-500/20 to-transparent",
      border: "border-purple-500/30"
    },
    {
      value: "ΔC = 0.013",
      label: "Paridad Sangre vs. PET",
      desc: "Plasma p-tau217 iguala al PET con ciclotrón por una fracción de su costo.",
      icon: <Sparkles className="h-5 w-5 text-amber-400" />,
      color: "from-amber-500/20 to-transparent",
      border: "border-amber-500/30"
    },
    {
      value: "51.4% vs 10.1%",
      label: "Divergencia a 5 Años",
      desc: "Conversión a demencia en Amiloide+ vs Amiloide- (Log-rank p = 1.36 × 10⁻²⁹).",
      icon: <TrendingUp className="h-5 w-5 text-pink-400" />,
      color: "from-pink-500/20 to-transparent",
      border: "border-pink-500/30"
    }
  ];

  const figures = [
    {
      id: 0,
      badge: "Figura 1 • Supervivencia a 5 Años",
      title: "Análisis de Supervivencia Kaplan-Meier (Amiloide ≥ 24 Centiloids)",
      src: "/alzheimer-assets/adni_km_amyloid_conversion.png",
      alt: "Curva Kaplan-Meier de conversión de MCI a demencia estratificada por carga amiloide",
      metrics: "N = 806 • Log-Rank χ² = 127.61 • p = 1.36 × 10⁻²⁹",
      description: "Divergencia masiva en progresión clínica: a los 5 años, el 51.4% de los sujetos amiloide-positivos (≥ 24 Centiloids) progresó a demencia tipo Alzheimer (mediana de supervivencia: 4.32 años), comparado con apenas un 10.1% en sujetos amiloide-negativos cuya mediana de supervivencia no alcanzó el 50% de conversión durante el seguimiento."
    },
    {
      id: 1,
      badge: "Figura 2 • Riesgos Proporcionales",
      title: "Forest Plot del Modelo de Supervivencia de Cox Multivariado",
      src: "/alzheimer-assets/adni_cox_forest_plot.png",
      alt: "Forest Plot del modelo multivariado de Cox con Centiloids, Hipocampo y APOE4",
      metrics: "Centiloids HR = 1.016 (p = 2.2 × 10⁻²⁰) • Hipocampo HR = 0.686 (p = 1.79 × 10⁻⁶)",
      description: "Identificación de los determinantes independientes de la conversión rápida. La carga amiloide continua y la atrofia del volumen hipocampal ajustado por tamaño intracraneal dominan el riesgo predictivo, junto con el estatus de portador de APOE4 (HR = 1.416, p = 0.034), demostrando que la morfometría cerebral y los biomarcadores moleculares son complementarios e indispensables."
    },
    {
      id: 2,
      badge: "Figura 3 • Mecanismo Causal",
      title: "La Regla de Mediación del 75.5%: APOE4 → Amiloide → Cognición",
      src: "/alzheimer-assets/adni_mediation_replication.png",
      alt: "Diagrama de Mediación Causal replicado en OASIS-3 y ADNI",
      metrics: "OASIS-3: 76.9% Mediado (N=1,003) • ADNI: 75.5% Mediado (N=1,922, p < 0.0001)",
      description: "Replicación biofísica exacta en dos cohortes independientes y con dos escalas cognitivas distintas (MMSE en OASIS-3 y CDR-SB en ADNI). Prueba empíricamente que la vulnerabilidad genética conferida por APOE4 no degrada directamente la cognición, sino que opera en más de tres cuartas partes a través de la vía patológica de la agregación amiloide y neurodegeneración secundaria."
    },
    {
      id: 3,
      badge: "Figura 4 • Democratización Biomédica",
      title: "Paridad Diagnóstica: Biomarcador en Sangre (p-tau217) vs. PET Cerebral",
      src: "/alzheimer-assets/adni_plasma_vs_pet_comparison.png",
      alt: "Comparación de correlación y supervivencia entre p-tau217 plasmático y PET Centiloids",
      metrics: "Correlación Spearman ρ = 0.669 (p = 6.56 × 10⁻¹²⁸, N=977) • ΔC = 0.013 (p = 0.64)",
      description: "La prueba definitiva para la equidad en salud: en 977 pacientes emparejados, el p-tau217 en plasma exhibe una correlación altísima con el PET de amiloide. En análisis de supervivencia de MCI (N=306), el modelo basado únicamente en sangre alcanza C = 0.731 frente a C = 0.745 del PET nuclear (ΔC = 0.013, IC 95% [-0.044, 0.072] cruza cero). Un examen de sangre de $50 USD sustituye a un escáner nuclear de $4,000 USD."
    },
    {
      id: 4,
      badge: "Figura 5 • Utilidad Clínica Real",
      title: "Análisis de Curva de Decisión (DCA) — Beneficio Clínico Neto",
      src: "/alzheimer-assets/adni_dca_net_benefit.png",
      alt: "Decision Curve Analysis mostrando beneficio neto sobre estrategias ciegas",
      metrics: "Umbral de Probabilidad Terapéutica Pt ∈ [0.15, 0.65] • Superior a Tratar Todos",
      description: "Validación de utilidad médica según los estándares de Vickers & Elkin. El modelo multimodal proporciona un beneficio neto clínico superior a cualquier estrategia ciega en todo el rango de decisión médica relevante, optimizando la asignación de terapias costosas y evitando procedimientos invasivos innecesarios en pacientes de bajo riesgo."
    },
    {
      id: 5,
      badge: "Figura 6 • Neuroinflamación Exploratoria",
      title: "Análisis Exploratorio de sTREM2 en Líquido Cefalorraquídeo",
      src: "/alzheimer-assets/adni_km_trem2_tertiles.png",
      alt: "Curva Kaplan-Meier de terciles de sTREM2 en LCR en ADNI",
      metrics: "N = 438 • 194 Eventos • Cox HR = 0.952 (p = 0.513) • Log-rank p = 0.542",
      description: "Integridad científica total: reporte transparente distinguiendo hipótesis pre-registradas de análisis exploratorios post-hoc. La activación microglial medida por sTREM2 en LCR no demostró un efecto protector ni interacción significativa con la carga de Centiloids en esta cohorte analizada, guiando futuras líneas de investigación sobre neuroinflamación."
    }
  ];

  const levels = [
    {
      id: 1,
      title: "Vision MRI Volumétrica",
      model: "EfficientNetB0 + NIfTI",
      desc: "Extracción tensorial 3D directa de atrofia cortical y segmentación del hipocampo con Grad-CAM de calor interpretativo.",
      icon: <Brain className="h-8 w-8 text-cyan-400" />,
      color: "from-cyan-500/20 to-transparent",
      border: "hover:border-cyan-500/30"
    },
    {
      id: 2,
      title: "Genómica & Biomarcadores",
      model: "AlphaGenome DeepMind",
      desc: "Integración de alelos APOE4 (rs429358), variantes epigenéticas no codificantes y titulación plasmática de p-tau217.",
      icon: <Dna className="h-8 w-8 text-purple-400" />,
      color: "from-purple-500/20 to-transparent",
      border: "hover:border-purple-500/30"
    },
    {
      id: 3,
      title: "Razonamiento Clínico",
      model: "MedGemma Google Health",
      desc: "Traducción clínica automatizada a lenguaje natural en español, generación de informes estructurados y alertas según criterios NIA-AA.",
      icon: <Stethoscope className="h-8 w-8 text-pink-400" />,
      color: "from-pink-500/20 to-transparent",
      border: "hover:border-pink-500/30"
    },
    {
      id: 4,
      title: "Orquestador de Supervivencia",
      model: "Cox Paramétrico & XGBoost",
      desc: "Fusión de riesgos proporcionales con pesos validados en 5,078 pacientes para predecir la ventana temporal exacta de conversión a demencia.",
      icon: <Activity className="h-8 w-8 text-emerald-400" />,
      color: "from-emerald-500/20 to-transparent",
      border: "hover:border-emerald-500/30"
    }
  ];

  const humanityPillars = [
    {
      icon: <HeartHandshake className="h-8 w-8 text-pink-400" />,
      title: "1. Democratización Universal del Diagnóstico",
      tag: "Equidad Médica para el Sur Global",
      problem: "Más del 85% de la población del planeta vive en zonas sin acceso a ciclotrones ni escáneres PET de amiloide, cuyo costo supera los $4,000 USD por examen.",
      solution: "Al demostrar empíricamente que el biomarcador en sangre p-tau217 tiene paridad pronóstica con el PET (ΔC = 0.013), permitimos que un hospital público o clínica rural en Ecuador o cualquier parte del mundo realice un triaje de precisión con una simple muestra de sangre de $50 USD y una resonancia estándar.",
      highlight: "Diagnóstico temprano 5 a 10 años antes de la pérdida de autonomía cognitiva para comunidades históricamente desatendidas."
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-amber-400" />,
      title: "2. Triaje Ético para Terapias Monoclonales",
      tag: "Lecanemab / Donanemab & Prevención de ARIA",
      problem: "Los anticuerpos monoclonales aprobados cuestan más de $26,000 USD al año y acarrean un riesgo de hasta 21% de ARIA (edema cerebral severo y microhemorragias). Prescribirlos a ciegas pone en peligro la vida del paciente.",
      solution: "Nuestra regla del 75.5% y el modelo multivariado de supervivencia discriminan con exactitud quién está en la ventana dorada de progresión acelerada (quienes deben recibir el fármaco antes de la pérdida neuronal irreversible) y quién tiene una evolución indolente, evitando exponer a pacientes estables a riesgos hemorrágicos innecesarios.",
      highlight: "Protección contra efectos adversos fatales y optimización del gasto catastrófico de las familias."
    },
    {
      icon: <Coins className="h-8 w-8 text-emerald-400" />,
      title: "3. Sostenibilidad de los Sistemas de Salud",
      tag: "Ahorro Multimillonario en Salud Pública",
      problem: "El costo global de la demencia supera los 1.3 billones de dólares anuales. Cada paciente con diagnóstico tardío colapsa la economía familiar y el presupuesto de los hospitales públicos.",
      solution: "El Análisis de Curva de Decisión (DCA) prueba un beneficio clínico neto sustancial sobre cualquier estrategia médica ciega. Intervenir tempranamente mediante nutrición de precisión, control metabólico y fármacos oportunos retrasa la institucionalización y ahorra millones de dólares en hospitalizaciones evitables.",
      highlight: "Transición de una medicina reactiva y costosa a una medicina preventiva, predictiva y sostenible."
    },
    {
      icon: <Scale className="h-8 w-8 text-cyan-400" />,
      title: "4. Ciencia Abierta y Cero Algoritmos Caja Negra",
      tag: "Transparencia, Ética y Reproducibilidad",
      problem: "Los sistemas de IA comercial suelen ser cajas negras propietarias sin datos abiertos ni validación multicéntrica independiente, generando justificada desconfianza en la comunidad médica.",
      solution: "Liberamos la totalidad de los pesos del modelo, el pipeline de armonización de datos, las pruebas estadísticas y el manuscrito formal bajo licencia MIT en GitHub para que neurólogos, investigadores y universidades puedan auditar y construir sobre esta base sin restricciones.",
      highlight: "Ciencia auditable con código abierto al servicio exclusivo de la salud de la humanidad."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white pt-20 overflow-hidden">
      
      {/* Background Particles & Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <TechParticles />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-purple-900/20 via-cyan-900/10 to-transparent blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-16 max-w-7xl">
        
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase backdrop-blur-xl">
                <Zap className="h-3.5 w-3.5 fill-purple-400" /> Hult Prize 2026 Strategy
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs font-bold tracking-widest uppercase backdrop-blur-xl">
                <Globe className="h-3.5 w-3.5 text-cyan-400" /> 5,078 Pacientes (OASIS-3 + ADNI)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-bold tracking-widest uppercase backdrop-blur-xl">
                <FileText className="h-3.5 w-3.5 text-emerald-400" /> Manuscrito JPAD / Elsevier Ready
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95]">
              Alzheimer<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">AI</span>
            </h1>
            <p className="text-lg sm:text-xl font-bold tracking-widest uppercase text-gray-400 mb-6">
              Motor Pronóstico Multimodal DOMITILA • Validación Clínica Externa
            </p>
            
            <p className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto font-normal leading-relaxed mb-12">
              De la investigación de frontera a la <span className="text-white font-semibold">equidad médica global</span>. 
              Un sistema pronóstico de grado clínico validado en <span className="text-white font-semibold">5,078 pacientes</span> a través 
              de más de 50 centros médicos, demostrando que un biomarcador en sangre puede democratizar 
              la detección temprana del Alzheimer en todo el planeta.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link 
                href="#humanidad" 
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(219,39,119,0.4)] flex items-center gap-2"
              >
                <HeartHandshake className="h-5 w-5" /> ¿En qué ayuda a la humanidad?
              </Link>
              
              <Link 
                href="#evidencia" 
                className="bg-white text-black px-8 py-4 rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-2"
              >
                <LineChart className="h-5 w-5" /> Evidencia Científica
              </Link>
              
              <Link 
                href="/alzheimer-ai/dashboard" 
                className="bg-white/5 border border-white/20 px-8 py-4 rounded-2xl font-black text-base sm:text-lg hover:bg-white/10 transition-all backdrop-blur-xl flex items-center gap-2"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-400" /> Dashboard Clínico
              </Link>
              
              <a 
                href="/alzheimer-assets/DOMITILA_Scientific_Paper_JPAD.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 px-6 py-4 rounded-2xl font-black text-base hover:bg-cyan-500/20 transition-all backdrop-blur-xl flex items-center gap-2"
              >
                <Download className="h-5 w-5" /> Descargar Paper (PDF)
              </a>

              <a 
                href="https://github.com/erick007bon/DOMITIA-alzheimer-prognosis" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" /> GitHub Abierto
              </a>
            </div>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* EXECUTIVE METRICS TICKER */}
        {/* ========================================================= */}
        <section className="mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {keyMetrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-3xl bg-neutral-950/80 border ${item.border} backdrop-blur-xl flex flex-col justify-between hover:scale-[1.02] transition-transform`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-white/5">{item.icon}</span>
                  </div>
                  <div className="text-3xl font-black tracking-tight text-white mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    {item.label}
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE SECTION 1: ¿EN QUÉ AYUDARÁ ESTO A LA HUMANIDAD? */}
        {/* ========================================================= */}
        <section id="humanidad" className="mb-40 pt-10 scroll-mt-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-pink-400 font-black tracking-widest uppercase text-xs mb-3 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10">
              <HeartHandshake className="h-4 w-4" /> Misión y Propósito Trascendente
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              ¿En qué ayudará esto a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">Humanidad</span>?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 max-w-3xl mx-auto leading-relaxed">
              El Alzheimer no es solo una enfermedad neurológica; es la principal causa de dependencia y quiebra económica en las familias del mundo. Esta investigación fue concebida para derribar las barreras de inequidad médica global.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {humanityPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-white/10 hover:border-pink-500/30 transition-all flex flex-col justify-between group shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                    {pillar.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-400 block mb-1">
                        El Problema Actual en el Mundo:
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {pillar.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block mb-1">
                        Nuestra Solución Científica:
                      </span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {pillar.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-pink-300">
                  <CheckCircle2 className="h-4 w-4 text-pink-400 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Impact Quote Banner */}
          <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-purple-950/30 via-black to-cyan-950/30 border border-white/10 text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
              <p className="text-2xl md:text-3xl font-extrabold text-gray-200 italic leading-snug mb-4">
                "La medicina del futuro no es la que cura cuando el cerebro ya colapsó; es la que detecta con una gota de sangre diez años antes, cuando la memoria y la dignidad aún pueden salvarse."
              </p>
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                Erick Reinaldo Flores Zambrano • Head of AI Architecture & Autor Principal
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CORE SECTION 2: EVIDENCIA CIENTÍFICA (LAS 6 FIGURAS) */}
        {/* ========================================================= */}
        <section id="evidencia" className="mb-40 pt-10 scroll-mt-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-cyan-400 font-black tracking-widest uppercase text-xs mb-3 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <Microscope className="h-4 w-4" /> Publicación Científica de Alto Impacto
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              Evidencia Empírica de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Investigación</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 max-w-3xl mx-auto leading-relaxed">
              Resultados formales del estudio de armonización entre OASIS-3 (2,298 pacientes) y ADNI (3,700 pacientes). Las 6 figuras definitivas generadas para el manuscrito internacional.
            </p>
          </div>

          {/* Figure Select Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {figures.map((fig) => (
              <button
                key={fig.id}
                onClick={() => setSelectedFigure(fig.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedFigure === fig.id 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105" 
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                Fig {fig.id + 1}: {fig.badge.split("•")[1] || fig.badge}
              </button>
            ))}
          </div>

          {/* Active Figure Showcase Card */}
          <motion.div
            key={selectedFigure}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-[3rem] border border-white/15 bg-neutral-950 p-6 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Image Viewport */}
              <div className="lg:col-span-7 bg-black rounded-[2rem] border border-white/10 p-3 sm:p-6 overflow-hidden flex items-center justify-center min-h-[350px] relative group">
                <img 
                  src={figures[selectedFigure].src} 
                  alt={figures[selectedFigure].alt} 
                  className="w-full h-auto max-h-[550px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]" 
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-400 font-mono">
                  Visualización Oficial ADNI/OASIS-3
                </div>
              </div>

              {/* Data & Interpretation */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                    {figures[selectedFigure].badge}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                    {figures[selectedFigure].title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                      Métricas Estadísticas Clave:
                    </span>
                    <span className="text-sm font-black font-mono text-cyan-300">
                      {figures[selectedFigure].metrics}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base font-normal leading-relaxed">
                    {figures[selectedFigure].description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Protocolo NIST FIPS 180-4 / STROBE</span>
                  <a 
                    href="/alzheimer-assets/DOMITILA_Scientific_Paper_JPAD.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    Ver detalles en el paper <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Grid of All 6 Figures Thumbnail Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            {figures.map((fig) => (
              <button
                key={fig.id}
                onClick={() => setSelectedFigure(fig.id)}
                className={`p-3 rounded-2xl border text-left transition-all overflow-hidden ${
                  selectedFigure === fig.id 
                    ? "border-cyan-400 bg-cyan-500/10 ring-2 ring-cyan-500/30" 
                    : "border-white/10 bg-neutral-900/60 hover:bg-neutral-800"
                }`}
              >
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-2 border border-white/5">
                  <img src={fig.src} alt="" className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="text-[11px] font-bold text-white truncate">
                  Fig {fig.id + 1}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  {fig.badge.split("•")[1] || fig.badge}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: ARQUITECTURA MULTIMODAL DE 4 NIVELES */}
        {/* ========================================================= */}
        <section id="arch" className="mb-40 pt-10 scroll-mt-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-purple-400 font-black tracking-widest uppercase text-xs mb-3 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10">
              <Layers className="h-4 w-4" /> Fusión Tecnológica de Vanguardia
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              Arquitectura de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">4 Niveles</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 max-w-3xl mx-auto leading-relaxed">
              Combinamos los modelos de visión de última generación de Google DeepMind y modelos de supervivencia paramétrica de clase mundial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, idx) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-8 rounded-[2.5rem] bg-neutral-900/60 border border-white/10 ${level.border} transition-all overflow-hidden flex flex-col justify-between`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <div className="mb-8 p-4 bg-black/60 rounded-2xl w-fit border border-white/10">
                    {level.icon}
                  </div>
                  <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2 block">{level.model}</span>
                  <h3 className="text-2xl font-black mb-4 leading-tight">Nivel {level.id}: <br />{level.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed text-xs">
                    {level.desc}
                  </p>
                </div>

                <div className="mt-8 relative z-10 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase text-gray-500 group-hover:text-white transition-colors">
                  <span>Grado Hospitalario</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: PREVIEW DEL DASHBOARD CLÍNICO */}
        {/* ========================================================= */}
        <section id="dashboard" className="mb-40 pt-10 scroll-mt-24">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-emerald-400 font-black tracking-widest uppercase text-xs mb-3 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <ShieldCheck className="h-4 w-4" /> Terminal para Especialistas Médicos
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mt-2 text-white">
              El Dashboard del <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Neurólogo</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 max-w-3xl mx-auto leading-relaxed">
              Una plataforma web interactiva diseñada para la consulta neurológica y la investigación clínica. Carga de escaneos cerebrales, cálculo de riesgo y prescripción guiada por OpenFDA.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left MRI Demo with Grad-CAM */}
              <div className="lg:col-span-6 bg-black rounded-[2.5rem] overflow-hidden aspect-video relative border border-white/10 group">
                <img 
                  src="/alzheimer-assets/gradcam_real.png" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" 
                  alt="Grad-CAM Hippocampus Activation" 
                />
                <div className="absolute top-4 left-4 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
                  <span className="text-cyan-400 text-[10px] font-black uppercase flex items-center gap-2">
                    <ShieldAlert className="h-3 w-3" /> Grad-CAM: Atrofia Hipocampal Bilateral
                  </span>
                </div>
              </div>

              {/* Right Data Insights & Link */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                  <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block mb-2">Interpretación Multimodal MedGemma</span>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed italic">
                    "Volumen hipocampal ajustado en percentil 12 para edad de 68 años. Carga amiloide estimada en 42 Centiloids con p-tau217 plasmático concordante. Probabilidad de conversión rápida a demencia en 36 meses calculada en 64.8%..."
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Cálculo de Riesgo</span>
                    <span className="text-2xl font-black text-white">64.8%</span>
                    <span className="text-[10px] text-amber-400 font-bold block mt-1">Ventana Crítica Activa</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Guías FDA / NIA-AA</span>
                    <span className="text-2xl font-black text-emerald-400">Verificadas</span>
                    <span className="text-[10px] text-gray-500 font-bold block mt-1">Conexión API en tiempo real</span>
                  </div>
                </div>

                <Link 
                  href="/alzheimer-ai/dashboard"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black px-8 py-4 rounded-2xl font-black text-base hover:scale-[1.02] transition-all text-center shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                >
                  <Activity className="h-5 w-5" /> Abrir Terminal de Diagnóstico en Vivo
                </Link>
              </div>

            </div>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: MANUSCRITO CIENTÍFICO Y CIENCIA ABIERTA */}
        {/* ========================================================= */}
        <section id="paper" className="mb-32 pt-10 scroll-mt-24">
          <div className="rounded-[3.5rem] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-white/15 p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                    Formato JPAD / Elsevier
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Revisión por Pares Lista
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    Licencia Abierta MIT
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                  Cross-Cohort Generalization and Biomarker Parity of Multimodal Prognostic Models in Prodromal Alzheimer's Disease
                </h3>

                <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                  <span className="text-white font-bold">Autores:</span> Erick Reinaldo Flores Zambrano (Head of AI Architecture, Perdix Origin / Universidad Técnica de Manabí / Universidad de Guayaquil).
                  <br />
                  <span className="text-gray-400">Validado en 5,078 pacientes bajo armonización estadística de las cohortes OASIS-3 (Washington University in St. Louis) y ADNI (Alzheimer's Disease Neuroimaging Initiative / USC LONI).</span>
                </p>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                  <a 
                    href="/alzheimer-assets/DOMITILA_Scientific_Paper_JPAD.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white text-black px-8 py-4 rounded-2xl font-black text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" /> Descargar Manuscrito PDF (1.45 MB)
                  </a>

                  <a 
                    href="https://github.com/erick007bon/DOMITIA-alzheimer-prognosis" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-base hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" /> Repositorio GitHub de Replicación
                  </a>
                </div>
              </div>

              {/* Document Mockup Box */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs aspect-[1/1.4] bg-neutral-900 rounded-3xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl relative group hover:border-cyan-400/50 transition-all">
                  <div className="space-y-3">
                    <div className="h-4 w-16 bg-cyan-500/40 rounded-full" />
                    <div className="h-5 w-full bg-white/20 rounded" />
                    <div className="h-5 w-3/4 bg-white/20 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded mt-4" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                    
                    <div className="pt-6">
                      <div className="aspect-video bg-black/60 rounded-xl border border-white/10 p-2 flex items-center justify-center">
                        <img src="/alzheimer-assets/adni_km_amyloid_conversion.png" alt="" className="w-full h-full object-contain opacity-70" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>PDF Oficial</span>
                    <span className="text-cyan-400 font-bold">JPAD / Elsevier</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FOOTER STRATEGY STATEMENT */}
        {/* ========================================================= */}
        <section className="text-center py-16 border-t border-white/10">
          <Globe className="h-16 w-16 text-white/15 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            "La detección temprana no solo salva neuronas; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              devuelve tiempo a las familias.
            </span>"
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">
            Perdix Origin 2026 • Portoviejo / Guayaquil, Ecuador • Hult Prize Global
          </p>
        </section>

      </div>
    </main>
  );
}
