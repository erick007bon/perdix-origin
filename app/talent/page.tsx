"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  Github, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Loader2,
  Lock,
  Zap,
  Key
} from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function TalentPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [connectedPlatform, setConnectedPlatform] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleConnectClick = (platform: string) => {
    setConnectedPlatform(platform);
    // Simulation for all platforms
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setVerificationResult({ tier: "Simulated Expert", score: 85, modelsFound: 'N/A' });
      setShowResult(true);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-cyan-400 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            PERDIX TALENT BETA
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Stop Guessing. <br />
            <span className="text-white">Start Verifying.</span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The first <strong>AI Proof-of-Work</strong> platform. We verify your actual API usage, model access, and prompt history.
          </p>
        </div>

        {/* INTERACTIVE DEMO SIMULATOR */}
        <div className="relative max-w-4xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          
          {!showResult && !isScanning && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Prove your AI Workflow</h3>
                <p className="text-neutral-500">Select a provider to simulate verification.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleConnectClick("OpenAI")}
                  disabled
                  className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 opacity-50 cursor-not-allowed"
                >
                  <div className="p-4 rounded-full bg-neutral-900 group-hover:bg-green-500/20 transition-colors">
                    <Zap className="w-8 h-8 text-neutral-400 group-hover:text-green-400" />
                  </div>
                  <span className="font-medium">Verify OpenAI</span>
                  <span className="text-xs text-neutral-600">Real API Check Disabled</span>
                </button>

                <button 
                  onClick={() => handleConnectClick("GitHub")}
                  className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-neutral-900 group-hover:bg-purple-500/20 transition-colors">
                    <Github className="w-8 h-8 text-neutral-400 group-hover:text-purple-400" />
                  </div>
                  <span className="font-medium">Connect GitHub</span>
                  <span className="text-xs text-neutral-600">Simulate Check</span>
                </button>

                <button 
                  onClick={() => handleConnectClick("Midjourney")}
                  className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300"
                >
                  <div className="p-4 rounded-full bg-neutral-900 group-hover:bg-pink-500/20 transition-colors">
                    <Cpu className="w-8 h-8 text-neutral-400 group-hover:text-pink-400" />
                  </div>
                  <span className="font-medium">Midjourney API</span>
                  <span className="text-xs text-neutral-600">Simulate Check</span>
                </button>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {isScanning && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-cyan-400 animate-spin relative z-10" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-medium animate-pulse">Simulating connection to {connectedPlatform} API...</h3>
                <div className="flex flex-col gap-1 text-sm text-neutral-500 font-mono">
                  <span>&gt; Handshaking with Gateway... OK</span>
                  <span>&gt; Verifying License Tier... PENDING</span>
                  <span>&gt; Analyzing Usage Quotas... PENDING</span>
                </div>
              </div>
            </div>
          )}

          {/* RESULT STATE */}
          {showResult && verificationResult && (
            <div className="animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-8 items-stretch">
                
                {/* Score Card */}
                <div className="flex-1 bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  
                  <div className="relative w-32 h-32 mb-6">
                     <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="60" fill="transparent" stroke="#171717" strokeWidth="8" />
                      <circle cx="64" cy="64" r="60" fill="transparent" stroke="#22d3ee" strokeWidth="8" strokeDasharray="377" strokeDashoffset="10" strokeLinecap="round" className="animate-[dash_1.5s_ease-out_forwards]" />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-4xl font-bold text-white">{verificationResult.score}</span>
                       <span className="text-xs text-cyan-400 uppercase tracking-wider">Score</span>
                     </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{verificationResult.tier}</h3>
                  <p className="text-neutral-400 text-sm mb-6">Verified via API Simulation</p>
                  
                  <div className="flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20">Simulated Data</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">Safe Connection</span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-6 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium">Models Accessed</span>
                      </div>
                      <span className="text-green-400 font-bold">{verificationResult.modelsFound || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-medium">Verification Type</span>
                      </div>
                      <span className="text-yellow-400 font-bold">Simulation</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-xs text-neutral-500 mb-4 text-center">
                      Verified by Perdix Neural Network on {new Date().toLocaleDateString()}
                    </p>
                    <button 
                      onClick={() => {setShowResult(false); setIsScanning(false);}}
                      className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Run Simulation Again
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
        
        <div className="mt-16 text-center">
           <p className="text-sm text-neutral-500">Trusted by leading tech companies worldwide.</p>
           <div className="flex justify-center gap-8 mt-6 grayscale opacity-40">
             <span className="font-bold text-lg">GOOGLE</span>
             <span className="font-bold text-lg">MICROSOFT</span>
             <span className="font-bold text-lg">OPENAI</span>
             <span className="font-bold text-lg">HULT PRIZE</span>
           </div>
        </div>

      </section>


      <div className="py-20" /> {/* Spacer */}
    </main>
  );
}
