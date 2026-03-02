"use client";

import { motion } from "framer-motion";
import { Layout, Rocket, Palette, Globe, Layers, MousePointer2, Smartphone, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WebFactoryPage() {
  const steps = [
    {
      title: "Diseño de Autor",
      desc: "Interfaces únicas, dinámicas y con una estética senior que posicionan tu marca en la élite.",
      icon: <Palette className="h-6 w-6" />
    },
    {
      title: "Ingeniería Next.js",
      desc: "Código de alto rendimiento, optimizado para SEO y con tiempos de carga instantáneos.",
      icon: <Rocket className="h-6 w-6" />
    },
    {
      title: "Despliegue Atómico",
      desc: "Lanzamos tu plataforma a producción con infraestructura redundante y segura.",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden">
      {/* Visual background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.1),transparent)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <header className="max-w-4xl mb-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-xs uppercase tracking-widest mb-8">
                    <Layout className="h-4 w-4" /> Web Factory Division
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                    Fábrica de <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-500">Plataformas Web</span>
                </h1>
                <p className="text-gray-400 text-2xl font-medium leading-relaxed max-w-2xl">
                    No hacemos simples sitios web; construimos activos digitales de alto rendimiento con la ingeniería más avanzada del mercado.
                </p>
            </motion.div>
        </header>

        {/* Process Steps */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {steps.map((step, i) => (
                <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-[3rem] bg-white/5 border border-white/5 hover:border-indigo-500/40 transition-all hover:bg-white/[0.07] group"
                >
                    <div className="mb-8 p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit group-hover:scale-110 transition-transform">
                        {step.icon}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                </motion.div>
            ))}
        </section>

        {/* Mockup / Visual Section */}
        <section className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 overflow-hidden mb-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Omnicanalidad por defecto</h2>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
                        Cada plataforma que sale de nuestra fábrica está diseñada para ofrecer una experiencia impecable en cualquier dispositivo. Utilizamos Fluid Design Systems para una adaptación total.
                    </p>
                    <div className="flex gap-10 opacity-50 grayscale">
                        <Monitor className="h-10 w-10 text-white" />
                        <Smartphone className="h-10 w-10 text-white" />
                        <Layers className="h-10 w-10 text-white" />
                    </div>
                </div>
                
                <div className="relative rounded-[2rem] border border-white/10 p-4 bg-black/40 backdrop-blur-xl">
                    <div className="rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 flex items-center justify-center p-12">
                        <div className="relative w-full h-full border border-indigo-500/20 rounded-lg flex flex-col p-6 animate-pulse">
                            <div className="h-4 w-1/2 bg-indigo-500/20 rounded mb-4" />
                            <div className="h-3 w-full bg-indigo-500/10 rounded mb-2" />
                            <div className="h-3 w-full bg-indigo-500/10 rounded mb-2" />
                            <div className="flex-1" />
                            <div className="h-10 w-full bg-indigo-500/30 rounded" />
                        </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-indigo-600 text-white font-black shadow-2xl flex items-center gap-3">
                        <MousePointer2 className="h-5 w-5" /> Pixel Perfect
                    </div>
                </div>
            </div>
        </section>

        <div className="text-center">
            <Link href="/contacto" className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all">
                Lanzar Mi Plataforma <ArrowRight className="h-6 w-6" />
            </Link>
        </div>
      </div>
    </div>
  );
}
