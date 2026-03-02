"use client";

import { motion } from "framer-motion";
import { Database, Server, Users, Terminal, Cpu, Cloud, CheckCircle2, Loader2, Code2, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InfraestructuraPage() {
  const [deploying, setDeploying] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const startDeploy = (item: string) => {
    setDeploying(item);
    setProgress(0);
    setLogs([`Initializing deployment for ${item}...`, "Configuring security protocols...", "Allocating cloud resources..."]);
  };

  useEffect(() => {
    if (deploying && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev + 5);
        if (progress === 30) setLogs(prev => [...prev, "Provisioning virtual instance...", "Setting up environment variables..."]);
        if (progress === 70) setLogs(prev => [...prev, "Applying SSL certificates...", "Finalizing database schema..."]);
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setLogs(prev => [...prev, "Deployment COMPLETED successfully.", "Access endpoint: https://api.perdix.io/v1/resource"]);
    }
  }, [deploying, progress]);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden font-sans">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
                    <Cpu className="h-4 w-4" /> Engineering & Infrastructure
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                    Infraestructura <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">bajo demanda</span>
                </h1>
                <p className="text-gray-400 text-xl font-medium max-w-2xl leading-relaxed">
                    Despliega el motor de tu empresa en segundos. Desde clusters de bases de datos hasta CRMs inteligentes con agentes de IA integrados.
                </p>
            </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Deploy Controls */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfraCard 
                    title="Base de Datos SQL/NoSQL"
                    desc="PostgreSQL, MongoDB o Redis optimizados para alto tráfico."
                    icon={<Database className="h-6 w-6" />}
                    onClick={() => startDeploy("Cluster de Datos")}
                    disabled={!!deploying}
                />
                <InfraCard 
                    title="CRM Inteligente"
                    desc="Sistema de gestión de clientes con agentes de IA especializados."
                    icon={<Users className="h-6 w-6" />}
                    onClick={() => startDeploy("IA CRM Suite")}
                    disabled={!!deploying}
                />
                <InfraCard 
                    title="Servidor Cloud (Edge)"
                    desc="Despliegue global en Vercel, AWS o Google Cloud Functions."
                    icon={<Server className="h-6 w-6" />}
                    onClick={() => startDeploy("Edge Server")}
                    disabled={!!deploying}
                />
            </div>

            {/* Terminal / Status Interface */}
            <div className="lg:col-span-8">
                <div className="rounded-[2rem] bg-black border border-white/5 overflow-hidden h-[500px] flex flex-col shadow-2xl">
                    <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                                <div className="h-3 w-3 rounded-full bg-green-500/50" />
                            </div>
                            <span className="text-gray-500 text-xs font-mono">perdix-deploy-cli v.2.0.4</span>
                        </div>
                        {deploying && (
                            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                STATUS: PROVISIONING_{deploying.toUpperCase().replace(/\s/g, '_')}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1 p-8 font-mono text-sm overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-white/10">
                        {!deploying ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                                <Terminal className="h-12 w-12 opacity-20" />
                                <p>Waiting for infrastructure command...</p>
                                <p className="text-[10px] uppercase tracking-widest opacity-40">Select a resource to initialize deployment</p>
                            </div>
                        ) : (
                            <>
                                {logs.map((log, i) => (
                                    <motion.p 
                                        initial={{ opacity: 0, x: -10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        key={i} 
                                        className={log.includes("COMPLETED") ? "text-green-500 font-bold" : "text-gray-400"}
                                    >
                                        <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                        {log}
                                    </motion.p>
                                ))}
                            </>
                        )}
                    </div>

                    {deploying && (
                        <div className="px-8 py-4 bg-white/5 border-t border-white/5">
                            <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono">
                                <span>PROGRESS</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-indigo-500" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats / Benefits */}
            <div className="lg:col-span-4 space-y-6">
                <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10">
                    <Globe className="h-8 w-8 text-indigo-400 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2">Despliegue Global</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Tu infraestructura se replica automáticamente en más de 20 regiones para garantizar latencia mínima en cualquier parte del mundo.
                    </p>
                </div>
                <div className="p-8 rounded-[2rem] bg-purple-600/5 border border-purple-500/10">
                    <Code2 className="h-8 w-8 text-purple-400 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-2">API-First Design</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Accede a tus recursos mediante nuestra SDK profesional compatible con TypeScript, Python y Go. La integración es inmediata.
                    </p>
                </div>
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
            <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">¿Deseas una configuración personalizada?</h2>
            <Link href="/contacto" className="inline-flex items-center gap-3 bg-white text-black px-12 py-5 rounded-2xl font-black transition-all hover:scale-105 active:scale-95">
                Consultar con un Ingeniero
            </Link>
        </div>
      </div>
    </div>
  );
}

function InfraCard({ title, desc, icon, onClick, disabled }: any) {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className="text-left p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-indigo-500/40 hover:bg-white/10 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <div className="mb-6 h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                {icon}
            </div>
            <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
            <div className="mt-6 flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Configurar <ArrowRightIcon className="h-3 w-3" />
            </div>
        </button>
    );
}

function ArrowRightIcon(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    )
}
