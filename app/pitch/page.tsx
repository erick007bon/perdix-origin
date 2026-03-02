"use client";

import { useEffect } from "react";

export default function HultPrizePitch() {
  useEffect(() => {
    document.body.style.backgroundColor = "#050505";
    document.body.style.color = "#ffffff";
    const htmlElem = document.documentElement;
    htmlElem.style.scrollSnapType = "y mandatory";
    // Comentamos overflowY fixed en mobile para evitar que se corte, 
    // pero mantendremos snap para una exp tipo reel si cabe en pantalla.
    htmlElem.style.overflowY = "scroll";
    htmlElem.style.overflowX = "hidden";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      htmlElem.style.scrollSnapType = "";
      htmlElem.style.overflowY = "";
      htmlElem.style.overflowX = "";
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .slide {
            min-height: 100vh;
            width: 100vw;
            scroll-snap-align: start;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 2rem 1.5rem;
            box-sizing: border-box;
            background: radial-gradient(circle at center, #111 0%, #050505 100%);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            overflow: hidden;
        }

        @media (min-width: 768px) {
            .slide {
                padding: 4rem;
                height: 100vh; /* En desktop forzamos 100vh exactos */
            }
        }

        .slide-content {
            width: 100%;
            max-width: 1400px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 10;
        }

        .ambient-glow {
            position: absolute;
            filter: blur(80px);
            opacity: 0.3;
            z-index: 0;
            border-radius: 50%;
            pointer-events: none;
        }

        @media (min-width: 768px) {
            .ambient-glow {
                filter: blur(140px);
            }
        }

        .glass-panel {
            background: rgba(20, 20, 25, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border-radius: 24px;
        }

        /* ADN Animation CSS */
        .dna-container {
            width: 80px;
            height: 150px;
            position: relative;
            perspective: 1000px;
            margin: 0 auto;
        }
        @media (min-width: 768px) {
             .dna-container { width: 100px; height: 200px; }
        }
        
        .dna-strand {
            position: absolute;
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, #fff 0%, #38bdf8 50%, #b34fd4 100%);
            border-radius: 5px;
            animation: rotate 3s linear infinite;
            transform-style: preserve-3d;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
        }
        @media (min-width: 768px) {
             .dna-strand { height: 10px; }
        }

        @keyframes rotate {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #050505;
        }
        ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
      `}} />

      {/* SLIDE 1: PORTADA */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-indigo-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

          <div className="slide-content text-center items-center justify-center py-12 md:py-0">
              <div className="mb-8 md:mb-12 flex justify-center items-center h-40 md:h-48">
                  <div className="dna-container">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                          <div 
                              key={i} 
                              className="dna-strand" 
                              style={{ 
                                  top: `calc(${i} * 10%)`,
                                  animationDelay: `-${i * 0.3}s`
                              }}
                          ></div>
                      ))}
                  </div>
              </div>
              <div className="mb-4 md:mb-6 rounded-full bg-cyan-900/20 border border-cyan-500/30 px-4 md:px-6 py-1.5 md:py-2 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold text-cyan-400 backdrop-blur-sm">
                  Hult Prize 2026 International Pitch
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-gray-400 via-white to-white mb-6 md:mb-8 leading-[1.1] md:leading-tight">
                  Solving the Unseen.<br/>Scaling the Impact.
              </h1>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-4xl leading-relaxed px-4">
                  Pioneering Dual AI Architecture for <strong className="text-white">Global Healthcare</strong> (Alzheimer&apos;s) and <strong className="text-white">Food Security</strong> (Banana Plagues) powered by DeepMind & USC LONI.
              </h3>
          </div>
      </section>

      {/* SLIDE 2: THE PROBLEM */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-900 right-0 top-0"></div>
          <div className="slide-content justify-center py-12 md:py-0">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-white leading-tight">Two Planetary Crises.<br/><span className="text-red-500">One Root Cause: Late Detection.</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                  <div className="glass-panel p-6 md:p-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-4 mb-6 md:mb-8">
                          <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xl md:text-2xl">1</div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">Healthcare<br/><span className="text-red-400 text-lg md:text-xl font-medium tracking-wide">Neurological Collapse</span></h3>
                      </div>
                      <ul className="space-y-4 md:space-y-6 text-gray-300 text-lg md:text-xl font-light">
                          <li className="flex items-start border-b border-white/5 pb-4">
                              <span className="text-red-500 mr-3 md:mr-4 font-bold">$1.3T</span> Global economic cost of dementia. Structural brain damage is irreversible by the time symptoms appear.
                          </li>
                          <li className="flex items-start">
                              <span className="text-red-500 mr-3 md:mr-4 font-bold">20%</span> Misdiagnosis rate in standard health systems due to fragmented human analysis of MRIs.
                          </li>
                      </ul>
                  </div>
                  
                  <div className="glass-panel p-6 md:p-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-4 mb-6 md:mb-8">
                          <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xl md:text-2xl">2</div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">Food Security<br/><span className="text-orange-400 text-lg md:text-xl font-medium tracking-wide">Agricultural Collapse</span></h3>
                      </div>
                      <ul className="space-y-4 md:space-y-6 text-gray-300 text-lg md:text-xl font-light">
                          <li className="flex items-start border-b border-white/5 pb-4">
                              <span className="text-orange-500 mr-3 md:mr-4 font-bold">400M+</span> People rely on bananas as their staple food. TR4 Fusarium Wilt destroys entire plantations.
                          </li>
                          <li className="flex items-start">
                              <span className="text-orange-500 mr-3 md:mr-4 font-bold">100%</span> Crop loss occurs because farmers lack access to laboratory-grade phytopathology tools in the field.
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 3: UNIFYING ARCHITECTURE */}
      <section className="slide text-center">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-900 right-0 bottom-0"></div>
          <div className="ambient-glow w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-900 left-0 top-0"></div>
          
          <div className="slide-content items-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-purple-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">The Unified AI Brain</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 text-white">Perdix Origin Platform</h2>
              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-4xl mb-12 md:mb-20 px-4">
                  Different problems, identical underlying mathematical challenge: <span className="text-white font-medium">Pattern Recognition at early stages.</span> Our platform orchestrates two specialized engines.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-5xl px-4">
                  <div className="glass-panel p-6 md:p-10 flex-1 w-full relative group border-t-2 border-t-purple-500/50">
                      <div className="text-4xl mb-4">🧠</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">Cloud AI</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">Deep Tensor Extraction & Healthcare Multi-modal Fusion</p>
                  </div>
                  
                  <div className="text-purple-500/50 text-4xl md:text-6xl font-light rotate-90 md:rotate-0 tracking-widest hidden md:block">
                      &lt;===&gt;
                  </div>
                  <div className="text-purple-500/50 text-4xl mb-2 md:hidden">
                      ⇕
                  </div>

                  <div className="glass-panel p-6 md:p-10 flex-1 w-full relative group border-t-2 border-t-cyan-500/50">
                      <div className="text-4xl mb-4">📱</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">Edge AI</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">Agrotech Computer Vision engineered for Mobile Offline Inferencing</p>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 4: THE DATA FOUNDATION */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-blue-900 left-[-100px] top-1/2 transform -translate-y-1/2"></div>
           {/* Faint brain bg pattern simulating the pptx visual */}
          <div className="absolute right-[-10%] top-[-10%] w-1/2 h-full opacity-5 mix-blend-screen pointer-events-none" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920&q=80")', backgroundSize: 'cover'}}></div>

          <div className="slide-content justify-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-blue-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">Global Data Foundation</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 md:mb-16 text-white leading-tight">USC LONI & The IDEAS Project</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 items-center">
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                      <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed border-l-4 border-blue-500 pl-6">
                        Our AI models aren&apos;t trained on synthetic or standard data. We leverage the <b>Image Data Archive (IDA)</b> from the <b>Laboratory of Neuro Imaging (LONI)</b> at the University of Southern California (USC).
                      </p>
                      
                      <div className="glass-panel p-6 md:p-8 border-l-4 border-l-cyan-500">
                          <h4 className="text-white text-xl md:text-2xl font-bold mb-3 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                              The IDEAS Study Validation
                          </h4>
                          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                            We base our architecture on findings correlated with the IDEAS (Imaging Dementia—Evidence for Amyloid Scanning) project, enhancing PET scan analytical correlations with NIfTI MRI.
                          </p>
                      </div>

                      <div className="glass-panel p-6 md:p-8 border-l-4 border-l-indigo-500">
                          <h4 className="text-white text-xl md:text-2xl font-bold mb-3 flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block"></span>
                              ADNI Standardization
                          </h4>
                          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                            Strict adherence to Alzheimer&apos;s Disease Neuroimaging Initiative standardizations, parsing thousands of multi-country subjects ensuring zero bias clinical reliability.
                          </p>
                      </div>
                  </div>
                  
                  <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-8 glass-panel p-8 text-center bg-blue-900/10 border-blue-500/20">
                      <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-5xl md:text-7xl lg:text-8xl font-black">
                          145k<span className="text-blue-500">+</span>
                      </div>
                      <div className="text-gray-300 font-bold uppercase tracking-widest text-xs md:text-sm lg:text-base leading-relaxed hidden md:block">
                          Signatures Analyzed<br/>by IDA Globally
                      </div>
                      <div className="text-gray-300 font-bold uppercase text-xs  md:hidden text-left border-l border-white/20 pl-4">
                          Signatures<br/>Analyzed
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 5: HEALTHCARE SOLUTION */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-cyan-900 left-[-200px] bottom-[-200px]"></div>
          <div className="slide-content justify-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-cyan-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">Technological Moat 1</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-white flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  Healthcare: MedGemma & Late-Fusion
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-6">
                      <div className="glass-panel p-6 md:p-8 relative overflow-hidden group border-l-4 border-l-cyan-400">
                          <h4 className="text-cyan-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-1">Google DeepMind Integration</h4>
                          <h3 className="text-white text-xl md:text-3xl font-black mb-3">MedGemma-4B-IT Ecosystem</h3>
                          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                              We process dense clinical data and EHR using Google&apos;s pioneering medical LLM, bridging the gap between raw data and digestible medical insights.
                          </p>
                      </div>
                      <div className="glass-panel p-6 md:p-8 relative overflow-hidden group border-l-4 border-l-purple-500">
                          <h4 className="text-purple-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-1">Proprietary Architecture</h4>
                          <h3 className="text-white text-xl md:text-3xl font-black mb-3">Late-Fusion Multivariate AI</h3>
                          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                              Our clinical AI organically fuses 128 deep Keras parameters perfectly intertwined with Patient Age, MMSE, and clinical history through an XGBoost logic tree.
                          </p>
                      </div>
                  </div>
                  
                  {/* METRICAS (Placeholder grafico elegante en WEB para emular la PPTX) */}
                  <div className="glass-panel p-6 md:p-10 flex flex-col items-center justify-center border-white/10 bg-[#0a0a0a]">
                     <p className="text-center text-gray-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">Actual Orchestrator In-Vivo Results</p>
                     
                     <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full">
                         {/* Falsa Matriz UI web approach */}
                         <div className="w-full sm:w-1/2 bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col items-center">
                            <div className="text-[10px] text-gray-500 mb-2 font-mono uppercase">Confusion Matrix</div>
                            <div className="grid grid-cols-2 grid-rows-2 w-full aspect-square gap-1 p-1">
                                <div className="bg-cyan-900/60 flex items-center justify-center rounded font-mono font-bold text-xl md:text-3xl border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(8,145,178,0.2)]">43</div>
                                <div className="bg-[#1a1a1a] flex items-center justify-center rounded font-mono text-gray-600 border border-white/5">0</div>
                                <div className="bg-[#1a1a1a] flex items-center justify-center rounded font-mono text-gray-600 border border-white/5">2</div>
                                <div className="bg-white/90 text-black flex items-center justify-center rounded font-mono font-bold text-xl md:text-3xl">52</div>
                            </div>
                         </div>
                         {/* Falsa ROC UI web approach */}
                         <div className="w-full sm:w-1/2 bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col items-center relative overflow-hidden">
                            <div className="text-[10px] text-gray-500 mb-2 font-mono uppercase">ROC Curve (AUC = 0.98)</div>
                            <div className="w-full aspect-square border-l border-b border-gray-700 relative p-2">
                                <div className="absolute inset-0 m-4 border border-dashed border-gray-800 rounded-tl-full opacity-60"></div>
                                {/* Curva simulada */}
                                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 m-2 overflow-visible" style={{transform: 'scale(1,-1)'}}>
                                    <path d="M 0 0 C 10 90, 50 100, 100 100" fill="none" stroke="#22d3ee" strokeWidth="2" filter="drop-shadow(0px 0px 4px rgba(34,211,238,0.6))" />
                                    <path d="M 0 0 L 100 100" fill="none" stroke="#444" strokeWidth="1" strokeDasharray="4 4" />
                                </svg>
                            </div>
                         </div>
                     </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 6: SOLUCION BANANA */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-green-900 right-[10%] top-1/2 transform -translate-y-1/2"></div>
          {/* Subtle background hint of banana */}
          <div className="absolute inset-0 z-0 opacity-5 mix-blend-screen pointer-events-none" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

          <div className="slide-content justify-center items-center text-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-green-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">Technological Moat 2</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-16 text-white tracking-tight">Banana Disease Edge AI</h2>
              
              <div className="glass-panel p-6 md:p-12 lg:p-16 w-full max-w-6xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-12 border-b border-white/10 pb-8 md:pb-12 text-center md:text-left">
                      <div className="text-center">
                          <div className="text-5xl md:text-6xl font-black text-green-400 mb-2 md:mb-3 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">99%</div>
                          <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-sm">Target Accuracy</div>
                      </div>
                      <div className="text-center md:border-l md:border-r border-white/10">
                          <div className="text-5xl md:text-6xl font-black text-white mb-2 md:mb-3">Edge</div>
                          <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-sm">Offline Execution</div>
                      </div>
                      <div className="text-center">
                          <div className="text-5xl md:text-6xl font-black text-white mb-2 md:mb-3">&lt; 1s</div>
                          <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-sm">Inference Time</div>
                      </div>
                  </div>
                  <div className="flex flex-col items-center justify-center px-2 md:px-12">
                      <p className="text-center text-gray-300 text-lg md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl">
                          Built specifically for remote LATAM/African rural regions without internet. We utilize heavily quantized Convolutional Neural Networks on mobile devices to detect microscopic symptomatic patterns on banana leaves, <span className="font-semibold text-white">halting TR4 outbreaks instantly.</span>
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 7: MARKET OPPORTUNITY */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-yellow-900/60 top-[-100px] left-1/2 transform -translate-x-1/2"></div>
          <div className="slide-content justify-center items-center text-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-yellow-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">Global Scale</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-20 text-white">The Market Opportunity</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
                  {/* TAM */}
                  <div className="glass-panel p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                      <div className="absolute inset-0 border-b-4 border-white/20"></div>
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-md">$180B<span className="text-yellow-400">+</span></h3>
                      <div className="text-yellow-400 font-black text-xl mb-2 tracking-widest">TAM</div>
                      <p className="text-gray-400 text-sm md:text-base font-medium">Combined AI Health & Agro Market</p>
                  </div>
                  
                  {/* SAM */}
                  <div className="glass-panel p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 delay-100">
                      <div className="absolute inset-0 border-b-4 border-yellow-600/50"></div>
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-yellow-600 mb-4 drop-shadow-md">$15B</h3>
                      <div className="text-yellow-600 font-black text-xl mb-2 tracking-widest">SAM</div>
                      <p className="text-gray-400 text-sm md:text-base font-medium">LATAM & Developing Nations Needs</p>
                  </div>
                  
                  {/* SOM */}
                  <div className="glass-panel p-8 md:p-12 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 delay-200">
                      <div className="absolute inset-0 border-b-4 border-yellow-400"></div>
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-yellow-400 mb-4 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">$150M</h3>
                      <div className="text-yellow-400 font-black text-xl mb-2 tracking-widest">SOM <span className="text-xs text-yellow-400/60 font-medium">(Year 3)</span></div>
                      <p className="text-gray-300 text-sm md:text-base font-medium">Penetration in Key Farming & Clinic Hubs</p>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 8: BUSINESS VIABILITY */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-green-900/40 left-1/2 bottom-[10%] transform -translate-x-1/2"></div>
          <div className="slide-content justify-center px-2 py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-green-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase text-center md:text-left">Financial Sustainability</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-10 md:mb-16 text-white text-center md:text-left">B2B & B2G Revenue Models</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full text-left">
                  <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-cyan-500/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                          <span className="text-3xl md:text-4xl">🏥</span> Healthcare SaaS
                      </h3>
                      <h4 className="text-cyan-400 font-bold tracking-wider text-sm md:text-base mb-4 md:mb-6 uppercase">B2B Licensing / Pay-per-Inference</h4>
                      <p className="text-gray-300 text-base md:text-xl leading-relaxed">
                          Clinics pay a monthly license or API-call fee to access our ADNI-Standard orchestrator, circumventing the need for million-dollar proprietary software setups locally.
                      </p>
                  </div>
                  <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-green-500/10 rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
                      <h3 className="text-white text-2xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                          <span className="text-3xl md:text-4xl">🌾</span> Agriculture Tech
                      </h3>
                      <h4 className="text-green-400 font-bold tracking-wider text-sm md:text-base mb-4 md:mb-6 uppercase">B2G & Conglomerate Contracts</h4>
                      <p className="text-gray-300 text-base md:text-xl leading-relaxed">
                          Targeting Ministries of Agriculture and Multinational Exporters (like Dole/Chiquita). High-value preventative defense contracts to protect national GDP.
                      </p>
                  </div>
              </div>
              <div className="mt-8 md:mt-12 text-gray-400 text-sm md:text-lg lg:text-xl font-light bg-black/40 py-4 md:py-6 px-6 md:px-10 rounded-2xl border border-white/10 text-center backdrop-blur-md">
                  Both engines are unified mathematically under the <span className="text-white font-bold">Perdix Origin Platform</span> infrastructure, maximizing server efficiency and reducing OPEX.
              </div>
          </div>
      </section>

      {/* SLIDE 9: GLOBAL ROADMAP */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-900 right-[20%] top-[20%]"></div>
          <div className="slide-content justify-center items-center text-center py-12 md:py-0">
              <div className="mb-2 md:mb-4 text-purple-400 font-bold tracking-[0.2em] md:tracking-widest text-xs md:text-sm uppercase">Execution Plan</div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-20 text-white">Global Roadmap <span className="text-purple-400">(2026+)</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl relative">
                  {/* Línea conectora visible solo en desktop */}
                  <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-gray-800 via-purple-500/50 to-cyan-500/50 z-0"></div>

                  {/* Phase 1 */}
                  <div className="glass-panel p-6 md:p-8 relative z-10 text-left hover:-translate-y-2 transition-transform h-full flex flex-col">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black font-black text-xl md:text-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.3)]">1</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Validation</h3>
                      <h4 className="text-gray-400 mb-6 font-mono text-xs md:text-sm">Present - Late 2026</h4>
                      <ul className="space-y-3 text-gray-300 text-sm md:text-base font-light flex-grow">
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> Hult Prize Regional/Global Finals.</li>
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> Final training loop with USC LONI / ADNI datasets.</li>
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> Agro-Edge deployed in pilot farms.</li>
                      </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="glass-panel p-6 md:p-8 relative z-10 text-left hover:-translate-y-2 transition-transform h-full flex flex-col">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500 text-white font-black text-xl md:text-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(168,85,247,0.5)]">2</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Pilot Entry</h3>
                      <h4 className="text-purple-400 mb-6 font-mono text-xs md:text-sm">2027</h4>
                      <ul className="space-y-3 text-gray-300 text-sm md:text-base font-light flex-grow">
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> First B2B medical clinics integrated in LatAm natively.</li>
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> Government lobbying for TR4 prevention.</li>
                          <li className="flex items-start"><span className="text-purple-400 mr-2">•</span> Seed Round funding ($1M+ Target).</li>
                      </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="glass-panel p-6 md:p-8 relative z-10 text-left hover:-translate-y-2 transition-transform h-full flex flex-col">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-cyan-500 text-white font-black text-xl md:text-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(6,182,212,0.5)]">3</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">Deep Scaling</h3>
                      <h4 className="text-cyan-400 mb-6 font-mono text-xs md:text-sm">2028+</h4>
                      <ul className="space-y-3 text-gray-300 text-sm md:text-base font-light flex-grow">
                          <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span> Enterprise partnerships with cloud providers.</li>
                          <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span> Drone-automated inferencing for Agro.</li>
                          <li className="flex items-start"><span className="text-cyan-400 mr-2">•</span> Massive clinical expansions via APIs.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      {/* SLIDE 10: EQUIPO Y URL */}
      <section className="slide">
          <div className="ambient-glow w-[300px] h-[300px] md:w-[1000px] md:h-[1000px] bg-cyan-900 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"></div>
          <div className="slide-content justify-center items-center text-center py-12 md:py-0">
              <p className="text-lg md:text-2xl text-cyan-400 font-light mb-4 tracking-[0.2em] md:tracking-widest uppercase">Perdix Origin Core</p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 md:mb-16 text-white cursor-default">The Engineering Team</h2>
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 md:gap-16 mb-12 md:mb-20 w-full">
                  {/* Founder */}
                  <div className="text-center group w-full sm:w-auto">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-cyan-500/30 overflow-hidden mb-4 md:mb-6 mx-auto bg-gray-900 flex items-center justify-center group-hover:border-cyan-400 transition-all shadow-[0_0_30px_rgba(8,145,178,0.2)]">
                          <span className="text-4xl md:text-5xl">🇪🇨</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl text-white font-bold mb-1">Erick Zambrano</h3>
                      <p className="text-cyan-500 font-medium text-sm md:text-base">Head of AI Architecture</p>
                  </div>
                  {/* Co-Founder / Team */}
                  <div className="text-center group w-full sm:w-auto">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-500/30 overflow-hidden mb-4 md:mb-6 mx-auto bg-gray-900 flex items-center justify-center group-hover:border-purple-400 transition-all shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                          <span className="text-4xl md:text-5xl">🇪🇨</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl text-white font-bold mb-1">Perdix Team</h3>
                      <p className="text-purple-500 font-medium text-sm md:text-base">Medical & Agrotech</p>
                  </div>
              </div>

              <div className="glass-panel p-6 md:p-12 w-[95%] max-w-4xl mx-auto border-cyan-500/40 transform md:hover:scale-105 transition-all">
                  <h3 className="text-sm md:text-xl lg:text-2xl text-gray-400 font-light mb-4 md:mb-6 uppercase tracking-widest">Interact with the Live Production Engine</h3>
                  
                  <a href="https://ingenieria-platform.vercel.app/" target="_blank" rel="noreferrer" className="inline-block px-4 md:px-12 py-4 md:py-6 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl md:rounded-2xl text-lg md:text-3xl lg:text-4xl font-black text-white shadow-[0_0_40px_rgba(8,145,178,0.6)] md:shadow-[0_0_60px_rgba(8,145,178,0.6)] hover:shadow-[0_0_100px_rgba(8,145,178,0.9)] transition-all break-all">
                      ingenieria-platform.vercel.app
                  </a>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 md:gap-12 mt-8 md:mt-12 opacity-60">
                      <div className="text-lg md:text-2xl font-bold font-sans tracking-tight">USC <span className="text-gray-400 font-light">LONI</span> / ADNI</div>
                      <div className="hidden sm:block h-6 md:h-8 border-l border-gray-600"></div>
                      <div className="text-lg md:text-2xl font-bold font-sans tracking-tight">Google <span className="text-blue-400 font-medium">DeepMind</span></div>
                      <div className="hidden sm:block h-6 md:h-8 border-l border-gray-600"></div>
                      <div className="text-lg md:text-2xl font-black tracking-widest text-white flex items-center"><span className="mr-2">▲</span> Vercel</div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
