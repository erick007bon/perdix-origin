"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "Consultoría",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola Erick, soy ${formData.name}. Me interesa: ${formData.interest}. ${formData.message}`;
    // Principal number for WhatsApp (+593 963 951 193)
    window.open(`https://wa.me/593963951193?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decos */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Header */}
      <section className="container mx-auto px-6 text-center mb-24 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <span className="text-purple-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Contacto Global</span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                Hablemos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Impacto</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                ¿Tienes un proyecto audaz? Estamos listos para desplegar la infraestructura, automatización e IA que tu empresa necesita para dominar el mercado.
            </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 grid gap-12 md:grid-cols-2 max-w-5xl">
        
        {/* Contact Info */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
        >
            <div className="rounded-2xl border border-white/10 bg-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">Información Directa</h3>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="p-4 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg mb-1 tracking-tight">WhatsApp / Teléfono</div>
                            <div className="text-gray-400 font-medium">+593 963 951 193</div>
                            <div className="text-sm text-green-500 mt-2 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                Operativos 24/7
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Email Corporativo</div>
                            <div className="text-gray-400">eflores4006@utm.edu.ec</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold text-white">Base de Operaciones</div>
                            <div className="text-gray-400">Machala, El Oro, Ecuador</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/20 p-8 text-center">
                <MessageCircle className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Chat Directo</h3>
                <p className="text-gray-400 mb-6 text-sm">
                    La forma más rápida de obtener una respuesta es vía WhatsApp.
                </p>
                <Link 
                    href="https://wa.me/593963951193" 
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700 transition-colors w-full justify-center"
                >
                    <Send className="h-4 w-4" />
                    Iniciar Conversación
                </Link>
            </div>
        </motion.div>

        {/* Form */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/10 bg-card p-8"
        >
            <h3 className="text-xl font-bold text-white mb-6">Envíame un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input 
                        type="text" 
                        required
                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Tu nombre o empresa"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="correo@ejemplo.com"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Interés</label>
                    <select 
                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:border-purple-500 focus:outline-none transition-all font-medium appearance-none"
                        onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    >
                        <option value="Google Automate">Automatización (Google Automate)</option>
                        <option value="OpenAI/AI Brain">Inteligencia Artificial (OpenAI)</option>
                        <option value="Desarrollo Web Pro">Fábrica Web (Next.js/Plataformas)</option>
                        <option value="Infraestructura">Infraestructura (Bases de Datos/Servidores)</option>
                        <option value="SRI/Fiscal">Inteligencia Fiscal (SRI)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Mensaje</label>
                    <textarea 
                        rows={4}
                        required
                        className="w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Cuéntame sobre tu proyecto..."
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    className="w-full rounded-xl bg-white py-4 font-black text-black hover:bg-purple-500 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all transform active:scale-95"
                >
                    Desplegar Inteligencia
                </button>
            </form>
        </motion.div>

      </div>
    </div>
  );
}
