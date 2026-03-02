import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
        </Link>
        
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Suscripciones API
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Integración Empresarial. <span className="text-gradient">Escalable.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Acceso programático a nuestras soluciones de Ingeniería de Datos y Modelos de IA.
            Sin contratos forzosos. Cancela cuando quieras.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          
          {/* Plan Starter */}
          <PricingCard
            name="Developer"
            price="0"
            description="Perfecto para estudiantes y pruebas de concepto."
            features={[
              "500 Peticiones API / mes",
              "Acceso a API Banano (Básico)",
              "Soporte comunitario",
              "1 Proyecto activo"
            ]}
          />

          {/* Plan Pro (Most Popular) */}
          <PricingCard
            name="Startup"
            price="49"
            popular={true}
            description="Para negocios en crecimiento que necesitan datos reales."
            features={[
              "50,000 Peticiones API / mes",
              "Acceso COMPLETO (SRI + Banano + Crimen)",
              "SLA 99.9% Uptime",
              "Soporte prioritario por email",
              "Dashboard de analíticas avanzado"
            ]}
          />

          {/* Plan Enterprise */}
          <PricingCard
            name="Enterprise"
            price="Consultar"
            description="Soluciones a medida para grandes volúmenes de datos."
            features={[
              "Peticiones ilimitadas",
              "Despliegue On-Premise (Docker)",
              "Modelos personalizados",
              "Gerente de cuenta dedicado",
              "Auditoría de seguridad",
              "SSO / SAML"
            ]}
          />
        </div>

        {/* FAQ Section (Optional validation) */}
        <div className="mt-24 border-t border-white/5 pt-16">
          <h3 className="mb-8 text-2xl font-bold text-white text-center">Preguntas Frecuentes</h3>
          <div className="grid gap-8 md:grid-cols-2 text-gray-400">
            <div>
              <h4 className="mb-2 font-semibold text-white">¿Cómo obtengo mi API Key?</h4>
              <p>Regístrate en el dashboard, verifica tu email y genera tus keys en la sección de desarrolladores.</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-white">¿Los datos del SRI son oficiales?</h4>
              <p>Sí, nos conectamos en tiempo real a las bases de datos públicas para asegurar la validez de la información tributaria.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PricingCard({ name, price, description, features, popular }: any) {
  return (
    <div className={`relative flex flex-col rounded-2xl p-8 ${popular ? 'bg-white/5 border-primary/50 ring-1 ring-primary/50' : 'bg-transparent border border-white/10'}`}>
      
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
          MÁS POPULAR
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-lg font-medium text-white">{name}</h3>
        <p className="mt-2 text-sm text-gray-400">{description}</p>
      </div>

      <div className="mb-5 flex items-baseline">
        <span className="text-4xl font-bold text-white">
            {price === "Consultar" ? "" : "$"}
            {price}
        </span>
        {price !== "Consultar" && <span className="text-gray-500">/mes</span>}
      </div>

      <ul className="mb-8 flex-1 space-y-4">
        {features.map((feature: string) => (
          <li key={feature} className="flex items-start">
            <Check className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full rounded-lg py-3 text-sm font-semibold transition-all ${popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        {price === "Consultar" ? "Contactar Ventas" : "Comenzar Ahora"}
      </button>
    </div>
  );
}
