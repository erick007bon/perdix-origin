"use client";

import { motion } from "framer-motion";
import { 
  Bot, 
  FileText, 
  Users, 
  Share2, 
  Download, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "../../components/PaymentModal";

export default function AutomationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ name: "", price: 0 });

  const openPayment = (name: string, price: number) => {
    setSelectedProduct({ name, price });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        itemName={selectedProduct.name} 
        price={selectedProduct.price} 
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
        
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-400 backdrop-blur-md"
          >
            <Bot className="mr-2 h-4 w-4" />
            Business Automation Suite
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          >
            Tu empresa en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Piloto Automático</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-xl text-gray-400"
          >
            Flujos de trabajo inteligentes (n8n) listos para descargar. 
            Conecta tus aplicaciones y ahorra miles de horas hombre.
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          
          <AutomationCard 
            title="AI Invoice Processing"
            description="Olvídate de digitar facturas. Nuestro agente lee tus PDFs (Gmail), extrae los datos con OCR avanzado y los inserta directamente en tu Excel o QuickBooks."
            icon={<FileText className="h-8 w-8 text-blue-400" />}
            tags={['Gmail', 'LlamaParse', 'Excel', 'QuickBooks']}
            stat="Ahorra 20h/mes"
            price={149}
            onBuy={() => openPayment("AI Invoice Processing", 149)}
          />

          <AutomationCard 
            title="SEO Content Agent"
            description="Tu redactor personal 24/7. Investiga tendencias, analiza palabras clave y escribe artículos completos optimizados para SEO en WordPress."
            icon={<Zap className="h-8 w-8 text-yellow-400" />}
            tags={['Google Trends', 'GPT-4', 'WordPress', 'SEO']}
            stat="+300% Tráfico Orgánico"
            price={199}
            onBuy={() => openPayment("SEO Content Agent", 199)}
          />

          <AutomationCard 
            title="CRM Autopilot"
            description="Cada lead que llega a tu web o LinkedIn es enriquecido automáticamente con datos de Clearbit y asignado al vendedor correcto según su potencial."
            icon={<Users className="h-8 w-8 text-green-400" />}
            tags={['LinkedIn', 'Clearbit', 'HubSpot', 'Slack']}
            stat="+30% Conversión"
            price={99}
            onBuy={() => openPayment("CRM Autopilot", 99)}
          />

          <AutomationCard 
            title="Social Media Scheduler"
            description="Gestiona todo tu calendario editorial desde Notion. La IA genera el copy y la imagen, tú apruebas, y el bot publica por ti."
            icon={<Share2 className="h-8 w-8 text-pink-400" />}
            tags={['Notion', 'Claude 3', 'Instagram', 'Twitter']}
            stat="100% Automatizado"
            price={79}
            onBuy={() => openPayment("Social Media Scheduler", 79)}
          />

        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-white/5 bg-white/[0.02] py-20 px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold text-white">Tecnología Enterprise</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {['n8n', 'OpenAI', 'Google Gemini', 'AWS Lambda', 'Docker'].map((tech) => (
                <span key={tech} className="text-xl font-semibold text-white">{tech}</span>
            ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 text-center">
        <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-black p-12">
            <h2 className="mb-6 text-4xl font-bold text-white">¿Necesitas una solución a medida?</h2>
            <p className="mb-8 text-gray-400">Implementamos arquitecturas complejas para corporaciones.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contacto" className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200 transition-colors">
                    Agendar Consultoría <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
}

function AutomationCard({ title, description, icon, tags, stat, price, onBuy }: any) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card p-8 hover:border-purple-500/50 transition-colors">
      <div>
        <div className="mb-6 flex items-start justify-between">
            <div className="rounded-lg bg-white/5 p-3">
                {icon}
            </div>
            <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                <CheckCircle2 className="h-3 w-3" /> {stat}
            </span>
        </div>
        
        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
        <p className="mb-6 text-gray-400 leading-relaxed">{description}</p>
        
        <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag: string) => (
            <span key={tag} className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300 border border-white/5">
                {tag}
            </span>
            ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-6">
        <div className="text-2xl font-bold text-white">${price} <span className="text-sm font-normal text-gray-500">/ licencia</span></div>
        <button 
            onClick={onBuy}
            className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20"
        >
            <Download className="h-4 w-4" />
            Comprar Workflow
        </button>
      </div>
    </div>
  );
}
