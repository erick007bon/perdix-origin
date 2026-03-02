import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BrainAssistant from "./components/BrainAssistant";

const manrope = Manrope({
  variable: "--font-geek-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perdix Origin | Ingeniería de Impacto Global",
  description: "Agencia de Ingeniería de Software, Inteligencia Artificial y Automatización de Negocios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body
        className={`${manrope.variable} min-h-screen bg-background text-foreground antialiased selection:bg-purple-500 selection:text-white`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <BrainAssistant />
          <Footer />
        </div>
      </body>
    </html>
  );
}
