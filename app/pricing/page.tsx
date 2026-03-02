'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Crown } from 'lucide-react';

// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const plans = [
  {
    id: 'price_1', // Replace with real Price ID
    name: 'Ingeniero Junior',
    price: '$19',
    description: 'Acceso básico a consultas y cálculos.',
    features: ['Consultas ilimitadas', 'Cálculos básicos', 'Soporte por email'],
    icon: Zap,
    popular: false,
  },
  {
    id: 'price_2', // Replace with real Price ID
    name: 'Ingeniero Senior',
    price: '$49',
    description: 'Potencia total para profesionales.',
    features: ['Todo en Junior', 'Análisis de Planos (Vision)', 'Generación de Código', 'Auditoría Fiscal'],
    icon: Crown,
    popular: true,
  },
  {
    id: 'price_3', // Replace with real Price ID
    name: 'Enterprise',
    price: '$99',
    description: 'Para firmas de ingeniería.',
    features: ['Todo en Senior', 'API Privada', 'Soporte 24/7', 'Contrato SLA'],
    icon: Shield,
    popular: false,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Planes de Ingeniería
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Invierte en tu capacidad técnica. Herramientas de "Clase Mundial" para resolver problemas reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2rem] border ${
                plan.popular ? 'border-indigo-500 bg-indigo-900/10' : 'border-white/10 bg-white/5'
              } flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-[2rem]">
                  MÁS VENDIDO
                </div>
              )}
              
              <div className="mb-8">
                <plan.icon className={`h-12 w-12 mb-4 ${plan.popular ? 'text-indigo-400' : 'text-gray-400'}`} />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500">/mes</span>
                </div>
                <p className="text-gray-400 mt-4">{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {loading === plan.id ? 'Procesando...' : 'Elegir Plan'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
