'use client';

import { useState, useRef } from 'react';

interface ValidationResult {
  isValid: boolean;
  type: string;
  typeName?: string;
  province?: string;
  provinceName?: string;
  cedula?: string;
  errors?: string[];
}

interface CalcResult {
  success: boolean;
  contribuyente?: {
    ruc: string;
    tipo: string;
    provincia: string;
    cedula?: string;
  };
  regimen?: {
    regime: string;
    description: string;
    obligations: string[];
    monthlyIVA: boolean;
    annualIncomeTax: boolean;
  };
  calculo?: {
    ingresos_anuales: number;
    gastos_deducibles: number;
    base_imponible: number;
    impuesto_renta: number;
    bracket_porcentaje: number;
    cuota_rimpe_mensual: number | null;
    ahorro_por_deducciones: number;
  };
  multas?: {
    penalty: number;
    interest: number;
    total: number;
    breakdown: string;
  } | null;
  alertas?: string[];
  recomendaciones?: string[];
  message?: string;
  validation?: ValidationResult;
}

export default function CalculadoraPage() {
  const [ruc, setRuc] = useState('');
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [monthsLate, setMonthsLate] = useState('0');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleValidateRUC = async () => {
    if (!ruc.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/sri?ruc=${ruc.trim()}`);
      const data = await res.json();
      if (data.success) {
        setStep(2);
      } else {
        setResult(data);
      }
    } catch {
      setResult({ success: false, message: 'Error de conexión' });
    }
    setLoading(false);
  };

  const handleCalculate = async () => {
    if (!ruc.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/sri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ruc: ruc.trim(),
          annualIncome: parseFloat(income) || 0,
          deductibleExpenses: parseFloat(deductions) || 0,
          monthsLate: parseInt(monthsLate) || 0,
        }),
      });
      const data = await res.json();
      setResult(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch {
      setResult({ success: false, message: 'Error de conexión con el motor fiscal' });
    }
    setLoading(false);
  };

  const resetForm = () => {
    setRuc('');
    setIncome('');
    setDeductions('');
    setMonthsLate('0');
    setResult(null);
    setStep(1);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #010409 100%)', color: '#e6edf3' }}>
      {/* Hero */}
      <section style={{ padding: '80px 20px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            color: '#38bdf8',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
            letterSpacing: 1,
          }}>
            🏛️ MOTOR FISCAL REAL — ALGORITMOS OFICIALES SRI
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Calculadora <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fiscal Inteligente</span>
          </h1>
          <p style={{ fontSize: 18, color: '#8b949e', maxWidth: 600, margin: '0 auto' }}>
            Ingresa tu RUC y conoce tu situación tributaria en segundos. Motor basado en la tabla impositiva oficial del SRI Ecuador 2025.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ padding: '0 20px 60px', maxWidth: 700, margin: '0 auto' }}>
        {/* Step 1: RUC */}
        <div style={{
          background: 'rgba(22, 27, 34, 0.8)',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 24,
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{
              width: 32, height: 32, borderRadius: '50%',
              background: step >= 1 ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : '#30363d',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#fff',
            }}>1</span>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Validación de RUC</h2>
          </div>

          <label style={{ display: 'block', fontSize: 14, color: '#8b949e', marginBottom: 8 }}>
            Número de RUC o Cédula
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="text"
              value={ruc}
              onChange={e => { setRuc(e.target.value.replace(/\D/g, '').slice(0, 13)); setResult(null); setStep(1); }}
              placeholder="Ej: 0901234567001"
              maxLength={13}
              style={{
                flex: 1, padding: '14px 16px', borderRadius: 10,
                background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3',
                fontSize: 18, fontFamily: 'monospace', letterSpacing: 2,
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#38bdf8'}
              onBlur={e => e.target.style.borderColor = '#30363d'}
            />
            <button
              onClick={handleValidateRUC}
              disabled={loading || ruc.length < 10}
              style={{
                padding: '14px 24px', borderRadius: 10, border: 'none',
                background: ruc.length >= 10 ? 'linear-gradient(135deg, #38bdf8, #818cf8)' : '#30363d',
                color: '#fff', fontSize: 15, fontWeight: 700, cursor: ruc.length >= 10 ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? '...' : 'Validar'}
            </button>
          </div>
          <p style={{ fontSize: 12, color: '#484f58', marginTop: 8 }}>
            Algoritmo de verificación: Módulo 10 (personas) / Módulo 11 (sociedades) — Estándar oficial SRI
          </p>
        </div>

        {/* Step 2: Income */}
        {step >= 2 && (
          <div style={{
            background: 'rgba(22, 27, 34, 0.8)',
            border: '1px solid rgba(129, 140, 248, 0.15)',
            borderRadius: 16,
            padding: 32,
            marginBottom: 24,
            backdropFilter: 'blur(20px)',
            animation: 'fadeInUp 0.4s ease-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff',
              }}>2</span>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Datos Fiscales</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#8b949e', marginBottom: 6 }}>
                  Ingresos anuales (USD)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                  placeholder="Ej: 25000"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10, boxSizing: 'border-box',
                    background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3',
                    fontSize: 16, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = '#818cf8'}
                  onBlur={e => e.target.style.borderColor = '#30363d'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#8b949e', marginBottom: 6 }}>
                  Gastos deducibles (USD)
                </label>
                <input
                  type="number"
                  value={deductions}
                  onChange={e => setDeductions(e.target.value)}
                  placeholder="Ej: 5000"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 10, boxSizing: 'border-box',
                    background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3',
                    fontSize: 16, outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = '#818cf8'}
                  onBlur={e => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#8b949e', marginBottom: 6 }}>
                Meses de retraso en declaración (0 si está al día)
              </label>
              <input
                type="number"
                value={monthsLate}
                onChange={e => setMonthsLate(e.target.value)}
                min="0"
                max="60"
                style={{
                  width: 120, padding: '12px 14px', borderRadius: 10,
                  background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3',
                  fontSize: 16, outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#818cf8'}
                onBlur={e => e.target.style.borderColor = '#30363d'}
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading}
              style={{
                width: '100%', padding: '16px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #818cf8, #a78bfa, #c084fc)',
                color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.3s', opacity: loading ? 0.6 : 1,
                boxShadow: '0 4px 20px rgba(129, 140, 248, 0.3)',
              }}
            >
              {loading ? '⚡ Calculando...' : '⚡ Calcular Impuestos'}
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div ref={resultRef} style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            {!result.success ? (
              /* Error */
              <div style={{
                background: 'rgba(248, 81, 73, 0.08)',
                border: '1px solid rgba(248, 81, 73, 0.3)',
                borderRadius: 16, padding: 24,
              }}>
                <h3 style={{ color: '#f85149', margin: '0 0 8px' }}>❌ {result.message}</h3>
                {result.validation?.errors?.map((err, i) => (
                  <p key={i} style={{ color: '#f85149', margin: '4px 0', fontSize: 14 }}>• {err}</p>
                ))}
                <button onClick={resetForm} style={{
                  marginTop: 12, padding: '10px 20px', borderRadius: 8, border: '1px solid #30363d',
                  background: 'transparent', color: '#e6edf3', cursor: 'pointer', fontSize: 14,
                }}>
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              /* Success */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Header Card */}
                <div style={{
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: 16, padding: 24,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, color: '#38bdf8', fontWeight: 600, margin: '0 0 4px' }}>CONTRIBUYENTE VERIFICADO</p>
                      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{result.contribuyente?.tipo}</h3>
                      <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: 14 }}>
                        {result.contribuyente?.provincia} • RUC: {result.contribuyente?.ruc}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 4px' }}>RÉGIMEN</p>
                      <span style={{
                        padding: '6px 14px', borderRadius: 20,
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8', fontSize: 13, fontWeight: 600,
                      }}>
                        {result.regimen?.regime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tax Calculation */}
                {result.calculo && (
                  <div style={{
                    background: 'rgba(22, 27, 34, 0.8)',
                    border: '1px solid #30363d',
                    borderRadius: 16, padding: 24,
                  }}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#8b949e' }}>📊 CÁLCULO FISCAL</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                      <StatCard label="Ingresos Anuales" value={`$${result.calculo.ingresos_anuales.toLocaleString()}`} color="#38bdf8" />
                      <StatCard label="Base Imponible" value={`$${result.calculo.base_imponible.toLocaleString()}`} color="#818cf8" />
                      <StatCard label="Impuesto a la Renta" value={`$${result.calculo.impuesto_renta.toLocaleString()}`} color="#f97316" highlight />
                      <StatCard label="Bracket" value={`${result.calculo.bracket_porcentaje}%`} color="#a78bfa" />
                      {result.calculo.cuota_rimpe_mensual && (
                        <StatCard label="Cuota RIMPE/mes" value={`$${result.calculo.cuota_rimpe_mensual}`} color="#34d399" />
                      )}
                      {result.calculo.ahorro_por_deducciones > 0 && (
                        <StatCard label="Ahorro por Deducciones" value={`-$${result.calculo.ahorro_por_deducciones.toLocaleString()}`} color="#34d399" />
                      )}
                    </div>
                  </div>
                )}

                {/* Penalties */}
                {result.multas && (
                  <div style={{
                    background: 'rgba(248, 81, 73, 0.06)',
                    border: '1px solid rgba(248, 81, 73, 0.2)',
                    borderRadius: 16, padding: 24,
                  }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#f85149' }}>⚠️ ESTIMACIÓN DE MULTAS</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                      <StatCard label="Multa" value={`$${result.multas.penalty}`} color="#f85149" />
                      <StatCard label="Interés Mora" value={`$${result.multas.interest}`} color="#f97316" />
                      <StatCard label="Total Adicional" value={`$${result.multas.total}`} color="#f85149" highlight />
                    </div>
                    <p style={{ fontSize: 13, color: '#8b949e', marginTop: 12 }}>{result.multas.breakdown}</p>
                  </div>
                )}

                {/* Obligations */}
                {result.regimen?.obligations && result.regimen.obligations.length > 0 && (
                  <div style={{
                    background: 'rgba(22, 27, 34, 0.8)',
                    border: '1px solid #30363d',
                    borderRadius: 16, padding: 24,
                  }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#8b949e' }}>📋 OBLIGACIONES TRIBUTARIAS</h3>
                    {result.regimen.obligations.map((ob, i) => (
                      <div key={i} style={{
                        padding: '10px 14px', borderRadius: 8,
                        background: 'rgba(56, 189, 248, 0.05)',
                        border: '1px solid rgba(56, 189, 248, 0.1)',
                        marginBottom: 8, fontSize: 14,
                      }}>
                        {ob}
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommendations */}
                {result.recomendaciones && result.recomendaciones.length > 0 && (
                  <div style={{
                    background: 'rgba(52, 211, 153, 0.06)',
                    border: '1px solid rgba(52, 211, 153, 0.2)',
                    borderRadius: 16, padding: 24,
                  }}>
                    <h3 style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#34d399' }}>💡 RECOMENDACIONES</h3>
                    {result.recomendaciones.map((rec, i) => (
                      <p key={i} style={{ fontSize: 14, margin: '8px 0', lineHeight: 1.5 }}>{rec}</p>
                    ))}
                  </div>
                )}

                {/* New calculation */}
                <button onClick={resetForm} style={{
                  padding: '14px 24px', borderRadius: 12, border: '1px solid #30363d',
                  background: 'transparent', color: '#e6edf3', cursor: 'pointer',
                  fontSize: 15, fontWeight: 600, transition: 'all 0.2s',
                }}>
                  🔄 Nueva Consulta
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section style={{ padding: '40px 20px 80px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: '🏛️', text: 'Algoritmos Oficiales SRI' },
            { icon: '🔒', text: 'Sin almacenamiento de datos' },
            { icon: '⚡', text: 'Cálculo en tiempo real' },
            { icon: '🇪🇨', text: 'Normativa Ecuador 2025' },
          ].map((badge, i) => (
            <div key={i} style={{
              padding: '10px 16px', borderRadius: 10,
              background: 'rgba(22, 27, 34, 0.6)',
              border: '1px solid #21262d',
              fontSize: 13, color: '#8b949e',
            }}>
              {badge.icon} {badge.text}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, color, highlight }: { label: string; value: string; color: string; highlight?: boolean }) {
  return (
    <div style={{
      padding: '16px',
      borderRadius: 12,
      background: highlight ? `rgba(${hexToRgb(color)}, 0.1)` : 'rgba(13, 17, 23, 0.6)',
      border: `1px solid ${highlight ? color : '#21262d'}`,
    }}>
      <p style={{ fontSize: 12, color: '#8b949e', margin: '0 0 4px', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 800, margin: 0, color, fontFamily: 'monospace' }}>{value}</p>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
