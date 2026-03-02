"use client";

import { motion } from "framer-motion";
import { Lock, User, Shield, ArrowRight, Github, Chrome, Cloud } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/dashboard"), 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Visual background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(129,140,248,0.05),transparent)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6 font-black uppercase text-xs tracking-widest">
            Perdix Core Access
          </div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-2">Ingresar</h1>
          <p className="text-gray-500 font-medium">Control total sobre tus activos digitales.</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">ID de Ingeniero / Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  required
                  defaultValue="erick@perdix.io"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Clave de Encriptación (Modo Prueba)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input 
                  type="text" 
                  required
                  defaultValue="ingenieria2026"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Sincronizando..." : "Autorizar Acceso"}
              {!loading && <Shield className="h-5 w-5" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
            <p className="text-center text-xs font-black text-gray-600 uppercase tracking-widest">O entrar mediante</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all">
                <Github className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-wider">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all">
                <Cloud className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-wider">Vercel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1">
            Volver a la Terminal <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
