"use client";

import { motion } from "framer-motion";
import { Dna, ArrowLeft, BookOpen, Fingerprint, Network, Database, AlertTriangle, Activity, Beaker, Shield, TrendingUp, Microscope } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const geneVariants = [
  { gene: "APOE ε4", rsid: "rs429358", risk: 0.87, chr: "Chr 19", effect: "Alteración del transporte de lípidos y aclaramiento de Aβ", population: "15-25%", color: "from-red-500 to-orange-500" },
  { gene: "TREM2", rsid: "rs75932628", risk: 0.62, chr: "Chr 6", effect: "Disfunción de microglía y neuroinflamación crónica", population: "0.3-0.5%", color: "from-purple-500 to-pink-500" },
  { gene: "CLU", rsid: "rs11136000", risk: 0.34, chr: "Chr 8", effect: "Modulación de la respuesta inmune innata cerebral", population: "36-38%", color: "from-blue-500 to-cyan-500" },
  { gene: "PICALM", rsid: "rs3851179", risk: 0.28, chr: "Chr 11", effect: "Endocitosis y tráfico sináptico alterado", population: "35-37%", color: "from-emerald-500 to-teal-500" },
  { gene: "BIN1", rsid: "rs6733839", risk: 0.31, chr: "Chr 2", effect: "Conectividad sináptica y homeostasis del calcio", population: "27-29%", color: "from-amber-500 to-yellow-500" },
];

const prsStages = [
  { label: "Bajo Riesgo", range: "0 - 20", color: "bg-emerald-500", width: "20%", desc: "Perfil genético protector. Seguimiento preventivo estándar." },
  { label: "Riesgo Moderado", range: "21 - 50", color: "bg-amber-500", width: "30%", desc: "Variantes de riesgo moderado detectadas. Monitoreo cada 12 meses." },
  { label: "Riesgo Alto", range: "51 - 80", color: "bg-orange-500", width: "30%", desc: "Carga poligénica significativa. Evaluación neuropsicológica recomendada." },
  { label: "Riesgo Crítico", range: "81 - 100", color: "bg-red-500", width: "20%", desc: "Alto PRS + variantes patogénicas. Derivación a genética clínica." },
];

export default function GenomicsPage() {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [prsScore] = useState(67);

  const sections = [
    {
      title: "ADN No Codificante",
      desc: "El 98% de nuestro genoma no codifica proteínas, pero contiene los interruptores maestros (potenciadores) que regulan la expresión génica en el cerebro.",
      icon: <Fingerprint className="text-blue-400" />,
      detail: "Los enhancers cerebrales pueden activar o silenciar genes de susceptibilidad a distancias de hasta 1 Mb. Variantes en estas regiones alteran la unión de factores de transcripción críticos."
    },
    {
      title: "AlphaGenome Insights",
      desc: "Modelos trans-epigenéticos que predicen cómo variantes raras afectan la accesibilidad de la cromatina (ATAC-seq) en neuronas piramidales.",
      icon: <Network className="text-purple-400" />,
      detail: "Utilizamos arquitecturas Transformer entrenadas en >100M variantes para predecir cambios en la estructura 3D de la cromatina con resolución de 1bp."
    },
    {
      title: "Polygenic Risk Scores (PRS)",
      desc: "Cálculo avanzado de riesgo basado en el efecto acumulativo de miles de variantes de bajo impacto descubiertas en estudios GWAS.",
      icon: <Database className="text-pink-400" />,
      detail: "El PRS integra >2,000 SNPs ponderados por sus tamaños de efecto (beta) de meta-análisis con N>400,000 individuos de cohortes europeas y multiétnicas."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <Link href="/alzheimer-ai" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 font-bold text-sm uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" /> Volver a Visión General
        </Link>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-4 text-blue-500 font-black tracking-[0.3em] uppercase text-xs mb-6">
                <Dna className="h-6 w-6" /> Deep Genomic Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                Guía Técnica de <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Genómica Alzheimer</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed font-medium max-w-3xl mb-20">
                La enfermedad de Alzheimer no es solo un diagnóstico clínico; es una cascada biológica que comienza décadas antes de los primeros síntomas. Mi motor genético analiza la arquitectura del ADN para detectar señales invisibles.
            </p>
        </motion.div>

        {/* CORE CONCEPTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {sections.map((s, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all group"
                >
                    <div className="mb-6 p-4 bg-black rounded-2xl w-fit border border-white/5 group-hover:scale-110 transition-transform">
                        {s.icon}
                    </div>
                    <h3 className="text-xl font-black mb-4">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-4">{s.desc}</p>
                    <p className="text-gray-600 text-xs leading-relaxed italic border-t border-white/5 pt-4">{s.detail}</p>
                </motion.div>
            ))}
        </div>

        {/* GENE VARIANT CARDS */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <Beaker className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-black tracking-tight">Variantes Genéticas de Riesgo</h2>
          </div>
          <p className="text-gray-400 font-medium mb-10 max-w-3xl">
            Los estudios GWAS han identificado <span className="text-white">más de 70 loci</span> asociados con el riesgo de Alzheimer. Aquí mostramos las variantes con el mayor tamaño de efecto validado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {geneVariants.map((v, i) => (
              <motion.div
                key={v.rsid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedVariant(selectedVariant === i ? null : i)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                  selectedVariant === i 
                    ? 'bg-white/10 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">{v.chr}</span>
                    <h4 className="text-xl font-black text-white">{v.gene}</h4>
                    <span className="text-xs text-blue-400 font-mono">{v.rsid}</span>
                  </div>
                  <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${v.color}`}>
                    {(v.risk * 100).toFixed(0)}%
                  </div>
                </div>
                
                {/* Risk Bar */}
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${v.risk * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full bg-gradient-to-r ${v.color} rounded-full`}
                  />
                </div>

                <p className="text-gray-400 text-xs leading-relaxed mb-3">{v.effect}</p>

                {selectedVariant === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-white/10 pt-3 mt-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Activity className="h-3 w-3" />
                      <span>Frecuencia poblacional: <span className="text-white font-bold">{v.population}</span></span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRS VISUALIZATION */}
        <section className="mb-32">
          <div className="p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-neutral-900 to-black border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <h2 className="text-3xl font-black tracking-tight">Polygenic Risk Score (PRS)</h2>
              </div>

              <p className="text-gray-400 font-medium mb-10 max-w-2xl">
                El PRS combina el efecto de <span className="text-white">2,134 variantes genéticas</span> en un solo puntaje de riesgo. No determina el destino, pero informa sobre la susceptibilidad.
              </p>

              {/* PRS Score Wheel */}
              <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a2e" strokeWidth="12" />
                    <motion.circle 
                      cx="100" cy="100" r="80" fill="none" 
                      stroke="url(#prsGradient)" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${prsScore * 5.03} 503`}
                      initial={{ strokeDasharray: "0 503" }}
                      whileInView={{ strokeDasharray: `${prsScore * 5.03} 503` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="prsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{prsScore}</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">/ 100</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {prsStages.map((stage) => (
                    <div key={stage.label} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      prsScore >= parseInt(stage.range.split(' - ')[0]) && prsScore <= parseInt(stage.range.split(' - ')[1])
                        ? 'bg-white/10 border border-white/10'
                        : 'opacity-50'
                    }`}>
                      <div className={`h-3 w-3 rounded-full ${stage.color} flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-white">{stage.label}</span>
                          <span className="text-xs text-gray-500 font-mono">{stage.range}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{stage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/80 leading-relaxed">
                  <strong>Nota Ética:</strong> El PRS es una herramienta probabilística, NO determinista. Un puntaje alto no garantiza desarrollo de Alzheimer, y un puntaje bajo no lo excluye. Factores ambientales, estilo de vida y epigenéticos modulan significativamente el riesgo absoluto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC CONTENT SECTION */}
        <section className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-neutral-900 to-black border border-white/10 relative overflow-hidden mb-20">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <BookOpen className="h-64 w-64" />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-3xl font-black mb-10">¿Cómo predice AlphaGenome?</h2>
                <div className="space-y-8 text-gray-400 font-medium">
                    <p>
                        Utilizo modelos de <span className="text-white italic">Transformers</span> entrenados en secuencias de ADN para aprender la gramática de la regulación génica. Al introducir una variante (SNP), el modelo predice el cambio en la probabilidad de unión de factores de transcripción.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <Microscope className="h-5 w-5 text-blue-400" />
                          <h4 className="text-white font-bold">Etapa 1: Embedding Genómico</h4>
                        </div>
                        <p className="text-sm text-gray-500">Cada secuencia de 1,000bp se tokeniza en k-mers de 6bp y se proyecta a un espacio de 768 dimensiones.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="h-5 w-5 text-purple-400" />
                          <h4 className="text-white font-bold">Etapa 2: Predicción Funcional</h4>
                        </div>
                        <p className="text-sm text-gray-500">El modelo predice 5,313 targets epigenómicos (ChIP-seq, ATAC-seq, DNase-seq) con AUC &gt; 0.90.</p>
                      </div>
                    </div>

                    <ul className="list-disc pl-6 space-y-4">
                        <li>Identificación de loci asociados con el aclaramiento de <span className="text-blue-400">Aβ42</span>.</li>
                        <li>Análisis de microglía y respuesta inflamatoria codificada.</li>
                        <li>Modelado de interacciones gen-ambiente (dieta MIND, ejercicio, sueño).</li>
                        <li>Predicción de <span className="text-purple-400">fosforilación de Tau</span> inducida por variantes reguladoras.</li>
                    </ul>
                </div>
             </div>
        </section>

        {/* REFERENCES */}
        <section className="text-center py-12 border-t border-white/5">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-6">Referencias Clave</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span className="px-3 py-1 bg-white/5 rounded-full">Bellenguez et al., Nature Genetics 2022</span>
            <span className="px-3 py-1 bg-white/5 rounded-full">Kunkle et al., Nature Genetics 2019</span>
            <span className="px-3 py-1 bg-white/5 rounded-full">Jansen et al., Nature Genetics 2019</span>
            <span className="px-3 py-1 bg-white/5 rounded-full">ADNI Database</span>
          </div>
        </section>

      </div>
    </main>
  );
}
