"use client";

import { motion } from "framer-motion";
import { Bot, Cloud, Zap, ArrowRight, CheckCircle2, Search, Code, Cpu } from "lucide-react";
import Link from "next/link";

export default function AutomationPage() {
  const services = [
    {
      title: "Google Automate Ecosystem",
      icon: <Cloud className="h-8 w-8 text-blue-400" />,
      desc: "Automatización nativa usando Google Apps Script, GCP y Workspace para máxima escalabilidad.",
      features: ["Integración con Drive y Sheets", "Cloud Functions de alta velocidad", "Seguridad de nivel empresarial"]
    },
    {
      title: "Orquestación OpenAI",
      icon: <Bot className="h-8 w-8 text-purple-400" />,
      desc: "Despliegue de agentes inteligentes que razonan y ejecutan tareas complejas de forma autónoma.",
      features: ["Modelos GPT-4 personalizados", "Sistemas RAG con datos locales", "Chatbots con memoria infinita"]
    },
    {
      title: "Procesos On-Demand",
      icon: <Zap className="h-8 w-8 text-amber-400" />,
      desc: "Flujos de trabajo que eliminan tareas repetitivas y errores humanos al 100%.",
      features: ["Monitoreo en tiempo real", "Alertas inteligentes", "Optimización de costos cloud"]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-xs mb-6 block">Efficiency Layer</span>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                    Automatización de <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Élite Mundial</span>
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
                    Dejamos atrás las herramientas limitadas. Construimos ecosistemas de ingeniería que trabajan por ti en Google Cloud y con el cerebro de OpenAI.
                </p>
            </motion.div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
            {services.map((service, idx) => (
                <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        {service.icon}
                    </div>
                    
                    <div className="mb-10 text-blue-400">
                        {service.icon}
                    </div>
                    
                    <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{service.title}</h3>
                    <p className="text-gray-400 font-medium mb-10 leading-relaxed italic opacity-80">
                        "{service.desc}"
                    </p>
                    
                    <ul className="space-y-4">
                        {service.features.map(feature => (
                            <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm font-bold">
                                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>

        {/* CTA Section */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="rounded-[3rem] bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black border border-white/10 p-16 text-center relative overflow-hidden"
        >
            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">¿Listo para escalar tu infraestructura?</h2>
                <p className="text-gray-400 text-xl font-medium mb-12 max-w-2xl mx-auto">
                    Nuestros agentes de ingeniería despliegan servidores, bases de datos y flujos inteligentes en tiempo récord.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="/contacto" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Hablemos de tu Proyecto
                    </Link>
                    <Link href="/servicios-ia" className="border border-white/10 bg-white/5 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                        Ver Inteligencia SRI
                    </Link>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
