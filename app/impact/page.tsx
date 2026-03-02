"use client";

import { motion } from "framer-motion";
import { Globe2, Heart, Scale, Users2 } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-block rounded-full bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-500"
        >
            HULT PRIZE 2026 CANDIDATE
        </motion.div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Tecnología con <br />
          <span className="text-pink-500">Propósito Global</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-xl text-gray-400">
          Nuestra misión va más allá del software. Construimos algoritmos que resuelven 
          hambre, injusticia y desigualdad económica.
        </p>
      </section>

      {/* Impact Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
            <ImpactCard 
                title="Hambre Cero (ODS 2)"
                project="AgroScan AI"
                stat="45%"
                desc="Reducción de pérdidas en cultivos de banano mediante detección temprana de plagas con Visión Artificial."
                icon={<Heart className="h-8 w-8 text-red-500" />}
            />
             <ImpactCard 
                title="Paz y Justicia (ODS 16)"
                project="UrbanShield"
                stat="30%"
                desc="Mejora en tiempos de respuesta policial gracias a modelos predictivos de criminalidad basados en datos históricos."
                icon={<Scale className="h-8 w-8 text-blue-500" />}
            />
             <ImpactCard 
                title="Trabajo Decente (ODS 8)"
                project="SMEs Automation"
                stat="10x"
                desc="Incremento en productividad para pequeñas empresas mediante la democratización de herramientas de automatización."
                icon={<Users2 className="h-8 w-8 text-green-500" />}
            />
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl text-center">
            <Globe2 className="mx-auto mb-8 h-16 w-16 text-gray-600" />
            <h2 className="mb-8 text-3xl font-bold text-white">Nuestro Compromiso</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
                "En Perdix Intelligence, creemos que la inteligencia artificial no debe ser un lujo de las grandes corporaciones. 
                Nuestra ingeniería está diseñada para ser accesible, escalable y, sobre todo, humana. 
                Cada línea de código que escribimos tiene un impacto directo en la economía real de Ecuador."
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                <div className="text-left">
                    <div className="font-bold text-white">Erick Flores</div>
                    <div className="text-sm text-gray-500">CEO & Founder</div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}

function ImpactCard({ title, project, stat, desc, icon }: any) {
    return (
        <div className="rounded-2xl bg-card p-8 border border-white/10 hover:bg-white/5 transition-colors">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-gray-500 tracking-widest text-xs uppercase">{title}</h3>
                {icon}
            </div>
            <div className="mb-2 text-4xl font-bold text-white">{stat}</div>
            <h4 className="mb-4 text-xl font-semibold text-pink-500">{project}</h4>
            <p className="text-gray-400">{desc}</p>
        </div>
    )
}
