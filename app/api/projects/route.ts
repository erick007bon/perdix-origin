import { NextResponse } from 'next/server';

/**
 * Projects API — Proyectos reales de Perdix Origin
 * Lista los módulos reales del ecosistema con su estado verídico
 */
const REAL_PROJECTS = [
  {
    id: 'sri-intelligence',
    name: 'SRI Intelligence',
    status: 'active',
    type: 'Fiscal/AI',
    description: 'Motor de análisis tributario con validación de RUC (Mod10/11) y cálculo de impuestos basado en tabla oficial SRI 2025.',
    features: ['Validación RUC', 'Cálculo Impuesto Renta', 'Régimen RIMPE', 'Estimación de multas'],
    url: '/calculadora',
    real: true,
  },
  {
    id: 'perdix-fabric',
    name: 'Perdix Fabric (AI Chat)',
    status: 'active',
    type: 'AI/LLM',
    description: 'Asistente IA basado en GPT-4o con streaming real. Filosofía Fabric: Wisdom over Intelligence.',
    features: ['Chat streaming', 'System prompt personalizado', 'Vercel AI SDK'],
    url: '/servicios-ia',
    real: true,
  },
  {
    id: 'platform-web',
    name: 'Plataforma Web',
    status: 'active',
    type: 'Web/Frontend',
    description: 'Landing page y sistema de navegación desplegado en Vercel con Next.js 16.',
    features: ['30 páginas', 'Responsive', 'SEO', 'Dark mode'],
    url: '/',
    real: true,
  },
  {
    id: 'agrovision',
    name: 'AgroVision AI',
    status: 'planned',
    type: 'ML/Agriculture',
    description: 'Sistema de detección de enfermedades en cultivos usando visión artificial. En fase de diseño.',
    features: [],
    url: null,
    real: false,
  },
];

export async function GET() {
  return NextResponse.json(REAL_PROJECTS);
}

export async function POST(req: Request) {
  return NextResponse.json({
    error: 'Creación de proyectos no disponible en esta versión',
    available: REAL_PROJECTS.map(p => ({ id: p.id, name: p.name, status: p.status })),
  }, { status: 405 });
}
