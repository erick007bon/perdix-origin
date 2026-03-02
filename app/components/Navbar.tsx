"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Rocket, Bot, LineChart, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MainLogo } from "./BrandAssets";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = () => setIsOpen(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold text-xl text-white group" onClick={closeMobile}>
          <MainLogo className="h-12 w-12 transition-transform group-hover:scale-110" />
          <div className="flex flex-col leading-tight">
            <span>Perdix</span>
            <span className="text-xs text-gray-500 font-normal tracking-widest">ORIGIN</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/" active={pathname === "/"}>Inicio</NavLink>
            <NavLink href="/talent" active={pathname === "/talent"}>Talento IA</NavLink>
            
            <div className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    Soluciones <ChevronDown className="h-4 w-4" />
                </button>
                {/* Mega Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-white/10 bg-card p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top shadow-2xl">
                    <MenuItem href="/soluciones/automatizacion" icon={<Bot className="text-purple-400" />} title="Business Automation" desc="Google & AI Workflows" />
                    <MenuItem href="/impacto" icon={<Rocket className="text-pink-400" />} title="Impacto Real" desc="AgroTech & Seguridad" />
                    <MenuItem href="/servicios-ia" icon={<LineChart className="text-blue-400" />} title="SRI Intelligence" desc="Análisis IA Tributario" />
                    <MenuItem href="/login" icon={<Shield className="text-green-400" />} title="Client Portal" desc="Acceso Clientes" />
                </div>
            </div>

            <NavLink href="/impacto" active={pathname === "/impacto"}>Impacto Social</NavLink>
            <NavLink href="/alzheimer-ai" active={pathname === "/alzheimer-ai"}>Alzheimer AI</NavLink>
            <Link href="/pitch" className="text-sm font-bold text-cyan-400 bg-cyan-900/40 px-3 py-1 rounded-full border border-cyan-500/50 hover:bg-cyan-800 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                🚀 Hult Prize Pitch
            </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white">
                Log in
            </Link>
            <Link href="/contacto" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-gray-200 transition-colors">
                Contratar Agencia
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white" aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10 bg-card overflow-hidden"
            >
                <div className="flex flex-col p-4 space-y-4">
                    <Link href="/" className="text-white" onClick={closeMobile}>Inicio</Link>
                    <Link href="/talent" className="text-gray-400" onClick={closeMobile}>Talento IA</Link>
                    <Link href="/soluciones/automatizacion" className="text-gray-400" onClick={closeMobile}>Automatización</Link>
                    <Link href="/impacto" className="text-gray-400" onClick={closeMobile}>Impacto</Link>
                    <Link href="/alzheimer-ai" className="text-gray-400" onClick={closeMobile}>Alzheimer AI</Link>
                    <Link href="/pitch" className="text-cyan-400 font-bold" onClick={closeMobile}>🚀 Hult Prize Pitch</Link>
                    <Link href="/login" className="text-gray-400" onClick={closeMobile}>Dashboard</Link>
                    <Link href="/contacto" className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black text-center hover:bg-gray-200 transition-colors" onClick={closeMobile}>
                        Contratar Agencia
                    </Link>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ href, active, children }: NavLinkProps) {
    return (
        <Link href={href} className={`text-sm font-medium transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
            {children}
        </Link>
    );
}

function MenuItem({ href, icon, title, desc, onClick }: MenuItemProps) {
    return (
        <Link href={href} onClick={onClick} className="flex items-start gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors">
            <div className="mt-0.5">{icon}</div>
            <div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-gray-500">{desc}</div>
            </div>
        </Link>
    );
}
