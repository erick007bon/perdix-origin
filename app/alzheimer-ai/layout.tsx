import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AlzheimerAI | Diagnóstico Temprano con IA — Perdix Origin",
  description:
    "Plataforma de asistencia diagnóstica para neurólogos. Arquitectura de 4 niveles: EfficientNetB0, AlphaGenome, MedGemma y XGBoost Clinical. Hult Prize 2026.",
  openGraph: {
    title: "AlzheimerAI | Perdix Origin",
    description:
      "Motor de IA de 4 niveles para detección temprana del Alzheimer. Desarrollado por Perdix Origin, Ecuador.",
    type: "website",
    locale: "es_EC",
    siteName: "Perdix Origin",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlzheimerAI — Diagnóstico con IA",
    description:
      "Plataforma médica IA para neurólogos. 4 niveles de análisis de precisión.",
  },
};

export default function AlzheimerAILayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
