"use client";

import { motion } from "framer-motion";
import { Zap, Lock, Globe, ArrowRight, BarChart3, Binary, Eye, Map } from "lucide-react";
import Link from "next/link";

export default function ImpactoPage() {
  const verticals = [
    {
      title: "AgroTech Vision",
      subtitle: "Diagnóstico con Deep Learning",
      desc: "Implementamos sistemas de visión artificial para la detección temprana de enfermedades en banano y camarón. Nuestra tecnología permite optimizar cosechas y reducir pérdidas mediante el análisis preventivo de datos biológicos.",
      icon: <Zap className="h-10 w-10 text-yellow-400" />,
      tag: "Agricultura 4.0",
      features: ["Detección de Sigatoka Negra", "Conteo de Biomasa en Camarón", "Optimización de Fertilizantes"]
    },
    {
      title: "Safety Analytics",
      subtitle: "Predicción Criminal Geoespacial",
      desc: "Ganadores del Hult Prize con un modelo de predicción geoespacial que utiliza algoritmos avanzados para trazar mapas de calor delictivos, permitiendo una gestión de seguridad preventiva y basada en evidencia.",
      icon: <Lock className="h-10 w-10 text-red-500" />,
      tag: "Hult Prize Winner",
      features: ["Mapas de Calor Predictivos", "Análisis de Patrones Geoespaciales", "Integración Ciudadana"]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-indigo-600/5 blur-[250px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <section className="max-w-4xl mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-xs uppercase tracking-widest mb-8">
                    <Globe className="h-4 w-4" /> Impacto Global de Ingeniería
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                    Tecnología que <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Transforma Realidades</span>
                </h1>
                <p className="text-gray-400 text-2xl font-medium leading-relaxed max-w-2xl">
                    No solo escribimos código; resolvemos problemas reales en sectores críticos. Desde el campo hasta la seguridad urbana.
                </p>
            </motion.div>
        </section>

        {/* Verticals Details */}
        <div className="space-y-40">
            {verticals.map((v, i) => (
                <section key={v.title} className="flex flex-col lg:flex-row gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className={`w-full lg:w-1/2 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                                {v.icon}
                            </span>
                            <span className="text-indigo-400 font-black tracking-widest uppercase text-xs">{v.tag}</span>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">{v.title}</h2>
                        <h3 className="text-2xl font-bold text-gray-500 mb-8">{v.subtitle}</h3>
                        <p className="text-lg text-gray-400 leading-relaxed font-medium mb-10">
                            {v.desc}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {v.features.map(f => (
                                <div key={f} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 font-bold text-sm text-gray-200">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full lg:w-1/2 aspect-video rounded-[3rem] bg-black border border-white/10 flex items-center justify-center relative group overflow-hidden shadow-2xl"
                    >
                        {/* Interactive Simulator Placeholder */}
                        {i === 0 ? (
                            <div className="absolute inset-0 p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-white tracking-widest uppercase">Scanner Active</span>
                                    </div>
                                    <span className="text-[10px] font-black text-yellow-500 tracking-widest uppercase">Sigatoka Detected: 12%</span>
                                </div>
                                <div className="flex-1 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                    <motion.div 
                                        animate={{ y: [0, 200, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-20"
                                    />
                                    <Eye className="h-20 w-20 text-white/5" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent" />
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-2">
                                    <div className="h-1 bg-white/20 rounded-full overflow-hidden"><motion.div animate={{ width: "70%" }} className="h-full bg-yellow-500" /></div>
                                    <div className="h-1 bg-white/20 rounded-full overflow-hidden"><motion.div animate={{ width: "40%" }} className="h-full bg-yellow-500" /></div>
                                    <div className="h-1 bg-white/20 rounded-full overflow-hidden"><motion.div animate={{ width: "90%" }} className="h-full bg-yellow-500" /></div>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 p-8 flex flex-col bg-neutral-950">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex gap-2 text-red-500">
                                        <Map className="h-4 w-4" />
                                        <span className="text-[10px] font-black tracking-widest uppercase">Predictive Map</span>
                                    </div>
                                    <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Sector: GYE-CENTRO</span>
                                </div>
                                <div className="flex-1 bg-neutral-900 rounded-2xl relative overflow-hidden">
                                    {/* Heatmap simulation */}
                                    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-600/40 blur-[40px] rounded-full animate-pulse" />
                                    <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-red-400/30 blur-[30px] rounded-full animate-pulse" />
                                    <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-orange-600/20 blur-[50px] rounded-full" />
                                    
                                    <div className="absolute inset-0 border border-white/5 grid grid-cols-8 grid-rows-8 opacity-20">
                                        {Array.from({length: 64}).map((_, i) => (
                                            <div key={i} className="border border-white/10" />
                                        ))}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 text-[8px] font-bold text-white uppercase tracking-tighter">
                                        Risk Probability: 84.2%
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-30">
                            <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                                Abrir Panel Full
                            </button>
                        </div>
                    </motion.div>
                </section>
            ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-40 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">¿Hacemos historia juntos?</h2>
            <div className="flex flex-wrap justify-center gap-6">
                <Link href="/contacto" className="bg-indigo-500 text-white px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                    Iniciar Colaboración
                </Link>
                <Link href="/servicios-ia" className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-white/10 transition-all">
                    Ver Inteligencia Fiscal
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
