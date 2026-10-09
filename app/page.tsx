"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Zap, 
  Lock, 
  Bot, 
  TrendingUp, 
  BrainCircuit, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { MainLogo, PartridgeWatermark, StarWatermark } from "./components/BrandAssets";
import Team from "./components/Team";
import { TechParticles } from "./components/TechParticles";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  status: string;
  desc: string;
  link: string;
  gradientClass: string;
  icon: ReactNode;
}

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: ReactNode;
  href?: string;
}

// ─── Color Map (fixes Tailwind purge bug with dynamic class names) ─────────────────
// Tailwind v4 cannot purge bg-${color}-500/20 at runtime — must use explicit strings.
const PROJECTS: Project[] = [
  {
    title: "Alzheimer AI (DOMITILA)",
    status: "Biotech",
    desc: "Plataforma de pronóstico multimodal validada en 5,078 pacientes (OASIS-3 + ADNI, C=0.741).",
    link: "/alzheimer-ai",
    gradientClass: "from-purple-500/20",
    icon: <BrainCircuit className="h-8 w-8 text-purple-400" />,
  },
  {
    title: "Google Automate",
    status: "Activo",
    desc: "Ecosistema de automatización nativo con Google Cloud y Workplace.",
    link: "/soluciones/automatizacion",
    gradientClass: "from-blue-500/20",
    icon: <Search className="h-8 w-8 text-blue-400" />,
  },
  {
    title: "OpenAI Brains",
    status: "Nuevo",
    desc: "Agentes inteligentes personalizados con GPT-4 y RAG corporativo.",
    link: "/servicios-ia",
    gradientClass: "from-pink-500/20",
    icon: <Bot className="h-8 w-8 text-pink-400" />,
  },
  {
    title: "SRI Intelligence",
    status: "Activo",
    desc: "Motor de análisis tributario automatizado de alta precisión.",
    link: "/servicios-ia",
    gradientClass: "from-amber-500/20",
    icon: <TrendingUp className="h-8 w-8 text-amber-400" />,
  },
  {
    title: "AgroTech Vision",
    status: "Activo",
    desc: "Diagnóstico de cultivos con Deep Learning (Banano y Camarón).",
    link: "/impacto",
    gradientClass: "from-yellow-500/20",
    icon: <Zap className="h-8 w-8 text-yellow-400" />,
  },
  {
    title: "Safety Analytics",
    status: "Activo",
    desc: "Predicción criminal geoespacial (Ganador Hult Prize).",
    link: "/impacto",
    gradientClass: "from-red-500/20",
    icon: <Lock className="h-8 w-8 text-red-500" />,
  },
  {
    title: "Web Factory",
    status: "Pro",
    desc: "Desarrollo de aplicaciones web y plataformas de alto rendimiento.",
    link: "/soluciones/web",
    gradientClass: "from-indigo-500/20",
    icon: <BrainCircuit className="h-8 w-8 text-indigo-400" />,
  },
];

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInterest, setUserInterest] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startDwellTimer = (action: () => void) => {
    if (timerRef.current) return;
    timerRef.current = setTimeout(() => {
      action();
      timerRef.current = null;
    }, 5000);
  };

  const stopDwellTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopDwellTimer();
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  const getVisibleProjects = (): Project[] => {
    return Array.from({ length: 3 }, (_, i) => PROJECTS[(currentIndex + i) % PROJECTS.length]);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const },
  };

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-background">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center md:pt-28 overflow-hidden min-h-[95vh]">
        
        <div className="absolute inset-0 z-[-1] select-none pointer-events-none">
          <TechParticles />
          
          <div className="absolute inset-0 opacity-60">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border-[2px] border-amber-500/40 rounded-[4rem] rotate-45 animate-pulse shadow-[0_0_60px_rgba(251,191,36,0.3)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-yellow-500/30 rounded-full animate-pulse blur-[1px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-radial-gradient animate-pulse blur-[100px] from-amber-500/10"></div>
            <img 
              src="/mystery-star.png" 
              alt="Mystery Star Background" 
              className="w-full h-full object-contain opacity-100 animate-spin-slow-reverse mix-blend-screen brightness-125 drop-shadow-[0_0_40px_rgba(251,191,36,0.5)]"
            />
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.1] pointer-events-none">
          <StarWatermark className="h-[1000px] w-[1000px] animate-pulse" />
        </div>

        <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[180px]" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <MainLogo className="h-44 w-44 mb-10 relative z-10 drop-shadow-[0_0_50px_rgba(251,191,36,0.4)] hover:scale-105 transition-transform duration-700 cursor-pointer" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-indigo-300 backdrop-blur-xl shadow-lg"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 mr-2.5 animate-pulse shadow-[0_0_12px_#6366f1]"></span>
          Intelligence-Driven Innovation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl lg:text-7xl mb-6 relative z-10 leading-[1.1] px-6 mx-auto text-balance"
        >
          {userInterest ? (
            <motion.span 
              key={userInterest} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-white"
            >
              Ingeniería {userInterest}
            </motion.span>
          ) : (
            <>
              Ingeniería de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">Impacto Global</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 max-w-3xl text-xl text-gray-400 md:text-2xl font-medium tracking-tight mx-auto leading-relaxed"
        >
          {userInterest === "Biomédica" && "Pronóstico multimodal y democratización del Alzheimer validado en 5,078 pacientes."}
          {userInterest === "Tributaria" && "Analizamos el SRI con precisión algorítmica para optimizar cada centavo de tu empresa."}
          {userInterest === "Agrícola" && "El banano y el camarón tienen un nuevo aliado: Deep Learning para detección de enfermedades."}
          {userInterest === "Seguridad" && "Predicciones geoespaciales para un mundo más seguro. El futuro nos pertenece."}
          {!userInterest && "Diseñamos el futuro combinando algoritmos de élite con una visión humana audaz."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex flex-col gap-6 sm:flex-row z-20 justify-center"
        >
          <Link
            href="/soluciones/automatizacion"
            className="group relative inline-flex items-center justify-center rounded-xl bg-white px-10 py-5 text-base font-black text-black transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
          >
            Explorar Tecnología
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/impacto"
            className="neon-border inline-flex items-center justify-center rounded-xl bg-black/60 px-10 py-5 text-base font-black text-white border border-white/10 backdrop-blur-2xl transition-all hover:bg-white/10"
          >
            Casos de Impacto
          </Link>
        </motion.div>
      </section>

      {/* ─── CAROUSEL ──────────────────────────────────────────────── */}
      <section className="relative bg-neutral-950 py-32 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-amber-600/5 blur-[180px] rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="text-amber-500 font-black tracking-widest uppercase text-[10px] mb-2 block">Frontera Tecnológica</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight text-balance">
                Roadmap de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Innovación</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-lg font-medium">Acércate a un proyecto para que el carrusel avance automáticamente.</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="rounded-full border border-white/10 bg-white/5 p-6 text-white backdrop-blur-3xl transition-all hover:bg-white/10 hover:border-white/30 active:scale-90"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="rounded-full border border-white/10 bg-white/5 p-6 text-white backdrop-blur-3xl transition-all hover:bg-white/10 hover:border-white/30 active:scale-90"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {getVisibleProjects().map((project, index) => (
                <motion.div
                  layout
                  key={`${project.title}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  onMouseEnter={() => {
                    if (index === 2) startDwellTimer(nextSlide);
                    if (index === 0) startDwellTimer(prevSlide);
                    if (project.title.includes("Alzheimer")) setUserInterest("Biomédica");
                    if (project.title.includes("SRI")) setUserInterest("Tributaria");
                    if (project.title.includes("Agro")) setUserInterest("Agrícola");
                    if (project.title.includes("Safety")) setUserInterest("Seguridad");
                  }}
                  onMouseLeave={stopDwellTimer}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── SERVICIOS ─────────────────────────────────────────────── */}
      <section className="relative bg-black py-40 overflow-hidden border-t border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-indigo-500 font-black tracking-widest uppercase text-[10px] mb-2 block">Infraestructura Corporativa</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
              Montamos tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Negocio Digital</span>
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">Desplegamos la tecnología que tu empresa necesita para escalar sin límites.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              title="Bases de Datos"
              desc="PostgreSQL, MongoDB y sistemas de almacenamiento de alto rendimiento."
              icon={<TrendingUp className="h-8 w-8" />}
              href="/soluciones/infraestructura"
            />
            <ServiceCard 
              title="CRM Personalizado"
              desc="Gestión de clientes inteligente adaptada a tu flujo de ventas."
              icon={<Search className="h-8 w-8" />}
              href="/soluciones/infraestructura"
            />
            <ServiceCard 
              title="Servidores & Cloud"
              desc="Despliegue en AWS, Google Cloud y Vercel con seguridad total."
              icon={<Lock className="h-8 w-8" />}
              href="/soluciones/infraestructura"
            />
            <ServiceCard 
              title="Web Apps"
              desc="Plataformas robustas, escalables y con diseño de clase mundial."
              icon={<BrainCircuit className="h-8 w-8" />}
              href="/soluciones/web"
            />
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ────────────────────────────────────────────── */}
      <section className="relative py-40 border-t border-white/10 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-pulse blur-[120px] bg-indigo-500/10"></div>
          <img 
            src="/mystery-star.png" 
            alt="Mystery Star Backdrop" 
            className="w-full h-full object-contain mix-blend-screen animate-spin-slow brightness-110 contrast-125 opacity-70"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn}>
            <p className="mb-14 text-sm font-black uppercase tracking-widest text-indigo-400 drop-shadow-lg">
              Infraestructura Tecnológica
            </p>
            <div className="flex flex-wrap justify-center gap-x-20 gap-y-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
              {['Python', 'TensorFlow', 'Google Cloud', 'n8n', 'Next.js', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="text-3xl md:text-4xl font-black text-white transition-all cursor-default hover:text-white hover:scale-110 hover:opacity-100 drop-shadow-sm">{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TEAM ──────────────────────────────────────────────────── */}
      <Team />

    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={project.link} className="glass-card group relative block h-[400px] w-full overflow-hidden rounded-[2rem] transition-all duration-700">
      {/* Dynamic Background Glow — uses explicit class strings (no dynamic purge issue) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
        <div>
          <div className="flex justify-between items-start mb-10">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-5 bg-white/5 rounded-2xl backdrop-blur-3xl border border-white/10 shadow-2xl group-hover:bg-white/10 transition-all"
            >
              {project.icon}
            </motion.div>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400 border border-white/5 group-hover:border-white/30 group-hover:text-white transition-all">
              {project.status}
            </span>
          </div>
          
          <h3 className="text-4xl font-black text-white mb-4 leading-tight tracking-tighter group-hover:translate-x-1 transition-transform">{project.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed font-medium line-clamp-3 group-hover:text-gray-300 transition-colors">{project.desc}</p>
        </div>

        <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
          Ver Inteligencia <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function ServiceCard({ title, desc, icon, href }: ServiceCardProps) {
  const content = (
    <div className="p-6 rounded-[1.5rem] bg-white/5 border border-white/5 h-full hover:border-indigo-500/30 transition-all group cursor-pointer">
      <div className="mb-4 p-3 rounded-xl bg-indigo-500/10 w-fit group-hover:bg-indigo-500/20 transition-all text-indigo-400">
        {icon}
      </div>
      <h4 className="text-xl font-black text-white mb-2 tracking-tight">{title}</h4>
      <p className="text-gray-400 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}
