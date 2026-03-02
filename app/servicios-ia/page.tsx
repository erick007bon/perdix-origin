"use client";

import { motion } from "framer-motion";
import { TrendingUp, Bot, PieChart, ShieldCheck, Database, FileSearch, Sparkles, ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServiciosIAPage() {
  const features = [
    {
      title: "SRI Intelligence V3",
      icon: <FileSearch className="h-10 w-10" />,
      desc: "Análisis masivo de comprobantes electrónicos con detección de anomalías y optimización fiscal automática.",
      impact: "+40% de Ahorro"
    },
    {
      title: "Custom OpenAI Brains",
      icon: <Bot className="h-10 w-10" />,
      desc: "Entrenamos modelos con el conocimiento de tu industria para auditar procesos en segundos.",
      impact: "Precisión del 99%"
    },
    {
      title: "Data Core Analytics",
      icon: <PieChart className="h-10 w-10" />,
      desc: "Transformamos bases de datos caóticas en dashboards estratégicos de alta resolución.",
      impact: "Voz Real de Datos"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-600/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <header className="max-w-4xl mb-32">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <Sparkles className="h-5 w-5" />
                    </span>
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Intelligence Division</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                    Ingeniería de <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Alta Inteligencia</span>
                </h1>
                <p className="text-gray-400 text-2xl font-medium leading-relaxed mb-12">
                    Algoritmos diseñados para dominar la complejidad. Desplegamos cerebros que analizan, razonan y predicen con precisión matemática.
                </p>
                <ArrowDown className="text-amber-500 h-10 w-10 animate-bounce" />
            </motion.div>
        </header>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
            {features.map((f, i) => (
                <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                >
                    <div className="mb-8 p-6 rounded-3xl bg-neutral-900 border border-white/5 group-hover:border-amber-500/30 transition-all">
                        <div className="text-amber-500 mb-6">{f.icon}</div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{f.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-6">{f.desc}</p>
                        <div className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 font-black text-sm w-fit border border-amber-500/20">
                            {f.impact}
                        </div>
                    </div>
                </motion.div>
            ))}
        </section>

        {/* Deep Infrastructure & Live Simulator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40">
            {/* Live Audit Simulation */}
            <div className="lg:col-span-12 mb-20 p-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-[3rem]">
                <div className="bg-neutral-950 rounded-[2.9rem] p-12 overflow-hidden relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">SRI Real Audit Engine</h2>
                            <p className="text-gray-400 font-medium italic">Motor de inteligencia analizando comprobantes en tiempo real.</p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={async () => {
                                    const btn = document.getElementById('audit-btn');
                                    if(btn) btn.innerText = "Procesando...";
                                    try {
                                        const res = await fetch('/api/audit', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ docId: "SRI-TEST-" + Math.floor(Math.random() * 1000) })
                                        });
                                        const data = await res.json();
                                        alert(`Auditoría Exitosa: Se detectaron ${data.data.anomalies.length} anomalías. Ahorro: $${data.data.total_savings}`);
                                        // Actualizar logs en segundo plano
                                        fetch('/api/logs', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ level: 'success', message: `Auditoría SRI ejecutada: $${data.data.total_savings} ahorrados.` })
                                        });
                                    } catch (e) {
                                        console.error(e);
                                    } finally {
                                        if(btn) btn.innerText = "Ejecutar Auditoría";
                                    }
                                }}
                                id="audit-btn"
                                className="px-6 py-3 rounded-xl bg-amber-500 text-black font-black flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                <div className="h-2 w-2 rounded-full bg-black animate-pulse" /> Ejecutar Auditoría
                            </button>
                            <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">
                                Exportar Reporte
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <AuditStat label="Comprobantes Procesados" value="1.2M+" color="text-white" />
                        <AuditStat label="Anomalías Detectadas" value="42" color="text-amber-500" />
                        <AuditStat label="Ahorro Proyectado" value="$284K" color="text-green-500" />
                        <AuditStat label="Precisión Algorítmica" value="99.98%" color="text-blue-400" />
                    </div>

                    {/* Chart Simulation */}
                    <div className="h-[300px] w-full bg-white/5 rounded-3xl p-8 border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-end justify-between h-full gap-2 lg:gap-4 relative z-10">
                            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className="flex-1 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}k
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between text-[10px] font-black text-gray-500 tracking-widest uppercase">
                            <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span><span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7">
                <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Infraestructura Progresiva</h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
                    No solo instalamos software; construimos los cimientos de tu empresa digital. Desde CRM inteligentes hasta bases de datos distribuidas que garantizan integridad y velocidad.
                </p>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-amber-400 h-6 w-6" />
                        <span className="text-white font-bold">Seguridad Criptográfica en SRI Data</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Database className="text-amber-400 h-6 w-6" />
                        <span className="text-white font-bold">Cluster de Datos de Alto Volumen</span>
                    </div>
                </div>
            </div>
            
            <div className="lg:col-span-5 relative aspect-square rounded-[2rem] bg-gradient-to-br from-amber-500/20 to-transparent border border-white/10 flex items-center justify-center overflow-hidden group">
                <TrendingUp className="h-40 w-40 text-amber-500/40 group-hover:scale-110 group-hover:text-amber-500/60 transition-all duration-700" />
                <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-sm" />
                <div className="p-8 relative z-10 text-center">
                    <span className="text-amber-400 font-black text-8xl block mb-2">99.9%</span>
                    <span className="text-white font-bold uppercase tracking-widest text-sm text-center block">Uptime Garantizado</span>
                </div>
            </div>
        </section>

        <div className="mt-32 text-center">
            <Link href="/contacto" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all">
                Auditar Mi Negocio <ArrowRight className="h-6 w-6" />
            </Link>
        </div>
      </div>
    </div>
  );
}

function AuditStat({ label, value, color }: any) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-4xl font-black ${color} tracking-tighter`}>{value}</p>
        </div>
    );
}
