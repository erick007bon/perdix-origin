"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Cpu, 
  Database, 
  Globe, 
  Layout, 
  Settings, 
  CreditCard, 
  Bell, 
  Plus, 
  Search,
  Zap,
  CheckCircle2,
  AlertCircle,
  Bot,
  Activity,
  Terminal,
  ShieldCheck,
  MousePointer2,
  ArrowRight
} from "lucide-react";
import { useState, cloneElement, useEffect } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [services, setServices] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [projRes, logRes, skillRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/logs'),
                fetch('/api/skills')
            ]);
            const projData = await projRes.json();
            const logData = await logRes.json();
            const skillData = await skillRes.json();
            
            setServices(projData);
            setLogs(logData);
            setSkills(skillData);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans flex text-white">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl hidden lg:flex flex-col p-8">
        <div className="mb-12">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">Perdix <span className="text-indigo-500">Core</span></h2>
        </div>

        <nav className="flex-1 space-y-2">
            <SidebarItem icon={<Layout />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={<Bot />} label="AI Training" active={activeTab === 'training'} onClick={() => setActiveTab('training')} />
            <SidebarItem icon={<Activity />} label="Sistemas" active={activeTab === 'systems'} onClick={() => setActiveTab('systems')} />
            <SidebarItem icon={<Cpu />} label="Automatización" active={activeTab === 'auto'} onClick={() => setActiveTab('auto')} />
            <SidebarItem icon={<Database />} label="Infraestructura" active={activeTab === 'infra'} onClick={() => setActiveTab('infra')} />
            <SidebarItem icon={<Globe />} label="Web & Apps" active={activeTab === 'web'} onClick={() => setActiveTab('web')} />
            <SidebarItem icon={<Zap />} label="Despliegues" active={activeTab === 'deploys'} onClick={() => setActiveTab('deploys')} />
            <div className="pt-8 border-t border-white/5 mt-8 space-y-2">
                <SidebarItem icon={<CreditCard />} label="Facturación" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                <SidebarItem icon={<Settings />} label="Ajustes" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </div>
        </nav>

        <div className="mt-auto p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Ingeniero Senior</p>
            <p className="text-sm font-bold truncate">Erick Flores Zambrano</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-black/10">
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Buscar recurso..."
                        className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all w-64"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="p-3 rounded-xl hover:bg-white/5 relative">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <div className="absolute top-3 right-3 h-2 w-2 bg-indigo-500 rounded-full border-2 border-black" />
                </button>
                <button className="flex items-center gap-3 bg-white text-black px-5 py-2.5 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all">
                    <Plus className="h-4 w-4" /> Nuevo Recurso
                </button>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-thin scrollbar-thumb-white/10">
            {activeTab === 'overview' && (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard icon={<Zap className="text-yellow-500" />} label="Llamadas IA" value="12,482" change="+14.2%" />
                        <StatCard icon={<Globe className="text-blue-500" />} label="Tráfico Web" value="452.1k" change="+3.4%" />
                        <StatCard icon={<Database className="text-purple-500" />} label="Almacenamiento" value="84.2 GB" change="Normal" />
                    </div>

                    {/* Resources List */}
                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black tracking-tight">Recursos Activos</h3>
                            <button className="text-sm font-black text-indigo-400 uppercase tracking-widest border-b border-indigo-500/0 hover:border-indigo-500 transition-all">Ver Historial</button>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                    <tr>
                                        <th className="px-8 py-4">Nombre</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4">Tipo</th>
                                        <th className="px-8 py-4">Carga CPU</th>
                                        <th className="px-8 py-4">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {services.map(service => (
                                        <tr key={service.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6 font-bold">{service.name}</td>
                                            <td className="px-8 py-6">
                                                <div className={`flex items-center gap-2 text-xs font-black uppercase ${service.status === 'active' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                    {service.status === 'active' ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                                                    {service.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-gray-400">{service.type}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500" style={{ width: service.load }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-500">{service.load}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600 transition-all opacity-0 group-hover:opacity-100">
                                                    <Settings className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            )}

            {activeTab === 'training' && (
                <div className="space-y-10">
                    <header>
                        <h3 className="text-4xl font-black mb-4">Base de Conocimientos</h3>
                        <p className="text-gray-400 font-medium">Nutre al Cerebro de Perdix con tus propios documentos y datos.</p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="p-10 rounded-[3rem] border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-indigo-500/5 hover:border-indigo-500/40 transition-all">
                            <Plus className="h-12 w-12 text-gray-500 group-hover:text-indigo-500 mb-6" />
                            <h4 className="text-xl font-bold mb-2">Subir Documento (PDF/TXT/DOCX)</h4>
                            <p className="text-sm text-gray-500">Máximo 50MB por archivo</p>
                        </div>
                        
                        <div className="p-10 rounded-[3rem] border border-white/10 bg-black/40">
                            <h4 className="text-xl font-bold mb-6">Fuentes Conectadas</h4>
                            <div className="space-y-4">
                                <ConnectedSource icon={<Layout className="text-blue-400" />} name="Manual de Operaciones.pdf" status="Indexed" />
                                <ConnectedSource icon={<Database className="text-purple-400" />} name="Catálogo Productos 2024.csv" status="Training..." />
                                <ConnectedSource icon={<Globe className="text-green-400" />} name="https://miweb.com/faq" status="Indexed" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                        <div>
                            <h4 className="text-3xl font-black mb-2 tracking-tight">RAG Engine Active</h4>
                            <p className="font-medium text-white/80">Tu Cerebro IA ahora responde usando contextualmente estas 3 fuentes.</p>
                        </div>
                        <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                            Probar en Chat
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div className="space-y-10">
                    <header>
                        <h3 className="text-4xl font-black mb-4">Facturación y Planes</h3>
                        <p className="text-gray-400 font-medium">Gestiona tu suscripción a la potencia de ingeniería de Perdix.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard 
                            plan="Start-up" 
                            price="49" 
                            features={["100h Automatización", "Cerebro Básico", "Soporte Standard"]} 
                        />
                        <PricingCard 
                            plan="Business" 
                            price="199" 
                            active 
                            features={["Automatización Ilimitada", "RAG Engine Pro", "Auditoría SRI Real-time"]} 
                        />
                        <PricingCard 
                            plan="Enterprise" 
                            price="999" 
                            features={["GPU Dedicada", "Modelos On-premise", "Ingeniero 24/7"]} 
                        />
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10">
                        <h4 className="text-xl font-bold mb-8">Métodos de Pago</h4>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 p-6 rounded-2xl bg-black/40 border border-indigo-500/30 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-16 bg-white/5 rounded flex items-center justify-center font-black text-[10px] text-gray-500 italic">VISA</div>
                                    <div>
                                        <p className="text-sm font-bold">•••• •••• •••• 1193</p>
                                        <p className="text-[10px] text-gray-500 uppercase font-black">Expira 12/26</p>
                                    </div>
                                </div>
                                <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full font-black uppercase">Principal</span>
                            </div>
                            <button className="flex-1 p-6 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-gray-500 hover:text-white">
                                <Plus className="h-4 w-4" /> Añadir Nueva Tarjeta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'systems' && (
                <div className="space-y-10">
                    <header>
                        <h3 className="text-4xl font-black mb-4 tracking-tighter">System Health & Ops</h3>
                        <p className="text-gray-400 font-medium">Consola de monitoreo senior para el cluster de ingeniería de Perdix.</p>
                    </header>

                    {/* Health Bars */}
                    {/* Health Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <HealthStat label="Nacos Service Mesh" value="128 Nodes" status="excellent" />
                        <HealthStat label="SuperAgent Harness" value="Deer-Flow Active" status="excellent" />
                        <HealthStat label="Long-Term Memory" value="Synced (ByteDance)" status="excellent" />
                        <HealthStat label="Sandbox Safety" value="Isolated" status="excellent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Live Terminal */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500">
                                    <Terminal className="h-4 w-4" /> Live System Logs
                                </h4>
                                <div className="flex gap-2">
                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-gray-500">Stream Live</span>
                                </div>
                            </div>
                            <div className="bg-black border border-white/10 rounded-2xl p-6 font-mono text-xs text-indigo-400 h-80 overflow-y-auto scrollbar-hide space-y-1">
                                {logs.length > 0 ? logs.map((log: any) => (
                                    <p key={log.id} className={log.level === 'warning' ? 'text-yellow-500' : log.level === 'success' ? 'text-green-500' : 'text-indigo-400'}>
                                        [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
                                    </p>
                                )) : (
                                    <p className="opacity-50 italic">Cargando logs del sistema...</p>
                                )}
                                <p className="animate-pulse">_</p>
                            </div>
                        </div>

                        {/* Agent Skills / Superpowers */}
                        <div className="space-y-4">
                            <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-500">
                                <MousePointer2 className="h-4 w-4" /> Skills de Agentes (864+ Activos)
                            </h4>
                            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 mb-4">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Web Factory Library</p>
                                <p className="text-xs font-bold text-white">Catálogo de Ideas: 32 Proyectos listos para generar.</p>
                            </div>
                            <div className="space-y-3">
                                {skills.length > 0 ? skills.map((skill: any) => (
                                    <SkillToggle key={skill.id} name={skill.name} enabled={skill.enabled} />
                                )) : (
                                    <p className="text-xs text-gray-500 italic">No hay habilidades instaladas.</p>
                                )}
                            </div>
                            <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mt-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                                    <h5 className="font-black text-sm uppercase">Modo Dev Ready</h5>
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Todos los recursos están configurados para el despliegue final de **Marzo 2026**.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* API Gateway & Webhooks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5">
                            <h4 className="text-xl font-bold mb-8">API Gateway Enterprise</h4>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between group">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Producción Key</p>
                                        <code className="text-sm text-indigo-400">px_live_••••••••••••1193</code>
                                    </div>
                                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Copiar</button>
                                </div>
                                <button className="w-full py-4 rounded-2xl border-2 border-dashed border-white/10 hover:border-white/20 transition-all font-black text-xs uppercase tracking-widest text-gray-500 hover:text-white">
                                    Generar Nueva API Key
                                </button>
                            </div>
                        </div>

                        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5">
                            <h4 className="text-xl font-bold mb-8">Webhooks (Real-time Sync)</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
                                    <span className="text-sm font-bold text-gray-300 truncate max-w-[200px]">https://crm.cliente.com/hook</span>
                                    <span className="text-[10px] font-black uppercase text-green-500">Activo</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 opacity-50">
                                    <span className="text-sm font-bold text-gray-400 truncate max-w-[200px]">https://slack.com/webhooks/...</span>
                                    <span className="text-[10px] font-black uppercase text-gray-500">Pendiente</span>
                                </div>
                                <button className="text-sm font-black text-indigo-400 uppercase tracking-widest mt-4 hover:underline">Configurar Endpoints</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'deploys' && (
                <div className="space-y-10">
                    <header className="flex justify-between items-end">
                        <div>
                            <h3 className="text-4xl font-black mb-4 tracking-tighter">Pipeline de Producción</h3>
                            <p className="text-gray-400 font-medium">Gestión de despliegues CI/CD automáticos para Perdix Origin.</p>
                        </div>
                        <button className="bg-indigo-600 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">
                            Nuevo Deployment
                        </button>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Deploy History */}
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Historial de Versiones</h4>
                            {[
                                { commit: "feat: RAG Knowledge Base implementation", branch: "main", time: "2h ago", status: "ready" },
                                { commit: "refactor: Dashboard Enterprise UI upgrade", branch: "main", time: "5h ago", status: "ready" },
                                { commit: "fix: Mobile layout responsive issues", branch: "hotfix/v1", time: "1d ago", status: "error" },
                                { commit: "init: Perdix SaaS Infrastructure", branch: "main", time: "2d ago", status: "ready" }
                            ].map((deploy, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className={`h-3 w-3 rounded-full ${deploy.status === 'ready' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <div>
                                            <p className="font-bold text-white mb-1">{deploy.commit}</p>
                                            <p className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-2">
                                                <span className="text-indigo-400">{deploy.branch}</span> • {deploy.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10"><ArrowRight className="h-4 w-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Domain Management */}
                        <div className="space-y-8">
                            <div className="p-10 rounded-[3rem] bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 h-32 w-32 bg-indigo-500/10 blur-3xl group-hover:scale-150 transition-transform" />
                                <h4 className="text-xl font-black mb-6">Dominios</h4>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
                                        <span className="text-sm font-bold text-white">perdix.origin</span>
                                        <span className="text-[10px] font-black uppercase text-green-500">Live</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 opacity-50">
                                        <span className="text-sm font-bold text-gray-400">dev.perdix.io</span>
                                        <span className="text-[10px] font-black uppercase text-gray-500">Standby</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                                    Configurar Custom Domain
                                </button>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
                                <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4">GCP Region</h4>
                                <p className="text-xl font-black mb-1">us-east1</p>
                                <p className="text-xs text-gray-500">South Carolina, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }`}
        >
            {cloneElement(icon, { size: 20 })}
            <span className="font-bold tracking-tight">{label}</span>
        </button>
    );
}

function StatCard({ icon, label, value, change }: any) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit">{icon}</div>
            <p className="text-sm font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
            <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black tracking-tighter">{value}</span>
                <span className={`text-xs font-bold ${change.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>{change}</span>
            </div>
        </div>
    );
}


function PricingCard({ plan, price, features, active }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border ${active ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_20px_50px_rgba(79,70,229,0.15)]' : 'border-white/5 bg-white/5'} transition-all relative overflow-hidden group`}>
            {active && <div className="absolute top-4 right-6 bg-indigo-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">Actual</div>}
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{plan}</p>
            <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black tracking-tighter">${price}</span>
                <span className="text-gray-500 text-xs font-bold">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-indigo-500" /> {f}
                    </li>
                ))}
            </ul>
            <button 
                onClick={async () => {
                    if (active) return;
                    try {
                        const res = await fetch('/api/stripe/checkout', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: 'user_123', email: 'erick@perdix.io' }), // Placeholder data
                        });
                        const data = await res.json();
                        if (data.url) window.location.href = data.url;
                    } catch (err) {
                        console.error('Error al procesar el pago:', err);
                    }
                }}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${active ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                {active ? 'Gestionar' : 'Elegir Plan'}
            </button>
        </div>
    );
}

function ConnectedSource({ icon, name, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/5">{icon}</div>
                <span className="text-sm font-bold text-gray-300">{name}</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${status.includes('...') ? 'text-yellow-500 animate-pulse' : 'text-green-500'}`}>
                {status}
            </span>
        </div>
    );
}

function HealthStat({ label, value, status }: any) {
    const colors: any = {
        excellent: 'text-green-500 bg-green-500/10',
        good: 'text-blue-500 bg-blue-500/10',
        warning: 'text-yellow-500 bg-yellow-500/10'
    };
    return (
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</p>
            <div className="flex items-center justify-between">
                <span className="text-xl font-black">{value}</span>
                <div className={`h-2 w-2 rounded-full ${colors[status].split(' ')[0]}`} />
            </div>
        </div>
    );
}

function SkillToggle({ name, enabled }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
            <span className="text-xs font-bold text-gray-300 group-hover:text-white">{name}</span>
            <div className={`h-4 w-8 rounded-full relative transition-all ${enabled ? 'bg-indigo-600' : 'bg-white/10'}`}>
                <div className={`absolute top-1 h-2 w-2 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`} />
            </div>
        </div>
    );
}
