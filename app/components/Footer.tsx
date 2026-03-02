import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { MainLogo } from "./BrandAssets";

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-card pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid gap-12 md:grid-cols-4 mb-12">
            
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center gap-3 font-bold text-xl text-white mb-4 group">
                    <MainLogo className="h-10 w-10 transition-transform group-hover:scale-110" />
                    <div className="flex flex-col leading-tight">
                      <span>Perdix</span>
                      <span className="text-xs text-gray-500 font-normal tracking-widest">ORIGIN</span>
                    </div>
                </Link>
                <p className="text-gray-400 max-w-sm mb-6">
                    Agencia de ingeniería de software y automatización impulsada por IA. 
                    Transformamos datos en decisiones y procesos en algoritmos.
                </p>
                <div className="flex flex-wrap gap-4">
                    <SocialIcon icon={<Github className="h-5 w-5" />} href="https://github.com/erick007bon" label="GitHub de Perdix Origin" />
                    <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="https://www.linkedin.com/in/erick-flores-zambrano-69075b198" label="LinkedIn de Erick Flores" />
                    <SocialIcon icon={<Mail className="h-5 w-5" />} href="mailto:eflores4006@utm.edu.ec" label="Email" />
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-gray-400 text-xs font-bold">
                        <Phone className="h-3 w-3" />
                        <span>+593 963 951 193</span>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div>
                <h4 className="font-bold text-white mb-6">Soluciones</h4>
                <div className="flex flex-col gap-3">
                    <FooterLink href="/soluciones/automatizacion">Google Automate</FooterLink>
                    <FooterLink href="/impacto">Impacto Agro & Seguridad</FooterLink>
                    <FooterLink href="/servicios-ia">SRI Intelligence</FooterLink>
                    <FooterLink href="/alzheimer-ai">Alzheimer AI</FooterLink>
                </div>
            </div>

            {/* Agencia */}
            <div>
                <h4 className="font-bold text-white mb-6">Agencia</h4>
                <div className="flex flex-col gap-3">
                    <FooterLink href="/contacto">Contacto</FooterLink>
                    <FooterLink href="/login">Portal de Clientes</FooterLink>
                    <FooterLink href="/talent">Talento IA</FooterLink>
                    <FooterLink href="/pitch">Hult Prize Pitch</FooterLink>
                </div>
            </div>

        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Perdix Origin. Todos los derechos reservados.
            <br />
            <span className="text-xs opacity-50">Erick Reinaldo Flores Zambrano</span>
        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ icon, href, label }: SocialIconProps) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <Link href={href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
            {children}
        </Link>
    );
}
