import Link from "next/link";
import { Github, Linkedin, Smartphone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Founder {
  name: string;
  role: string;
  image: string;
  linkedin: string | null;
  github: string | null;
  phone: string | null;
  description: string;
}

function TeamMemberImage({ founder }: { founder: Founder }) {
  const [error, setError] = useState(false);
  const initials = founder.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  if (error) {
    return (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center">
        <span className="text-4xl font-black text-white select-none">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={founder.image}
      alt={`${founder.name} — ${founder.role}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setError(true)}
    />
  );
}

const founders: Founder[] = [
  {
    name: "Erick Flores Zambrano",
    role: "CEO & Lead Architect",
    image: "/team/erick.png",
    linkedin: "https://www.linkedin.com/in/erick-flores-zambrano-69075b198",
    github: "https://github.com/erick007bon",
    phone: null,
    description: "Architecting the digital infrastructure of tomorrow.",
  },
  {
    name: "Andrés Astudillo Ávila",
    role: "Co-Founder & AI Engineer",
    image: "/team/andres.jpg",
    linkedin: "https://www.linkedin.com/in/andres-astudillo-avila-95a065160/",
    github: null,
    phone: "+593 99 671 9707",
    description: "Driving operational excellence and AI integration.",
  },
];

const Team = () => {
  return (
    <section className="relative py-24 bg-neutral-950 overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-4">
            Perdix Origin Leadership
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Minds united by a singular vision: To decode the complexity of the world through Intelligence.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group relative w-full max-w-sm"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl opacity-50 blur group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-neutral-900 rounded-2xl p-6 h-full border border-neutral-800 flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="relative w-48 h-48 mb-6 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-fuchsia-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
                    <TeamMemberImage founder={founder} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1">{founder.name}</h3>
                <p className="text-indigo-400 font-medium mb-4 text-sm tracking-wide uppercase">{founder.role}</p>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  {founder.description}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4 mt-auto">
                  {founder.linkedin && (
                    <Link
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                      title={`LinkedIn de ${founder.name}`}
                    >
                      <Linkedin size={20} />
                    </Link>
                  )}
                  {founder.github && (
                    <Link
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:bg-neutral-100 hover:text-black transition-all duration-300"
                      title={`GitHub de ${founder.name}`}
                    >
                      <Github size={20} />
                    </Link>
                  )}
                  {founder.phone && (
                    <div
                      className="p-2 rounded-full bg-neutral-800 text-neutral-400 cursor-help group/phone relative"
                      title="WhatsApp / Phone"
                    >
                      <Smartphone size={20} />
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/phone:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-neutral-700">
                        {founder.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

