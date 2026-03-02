import { NextResponse } from 'next/server';
import { validateRUC, determineRegime, calculateRIMPEQuota, estimateLatePenalty } from '@/lib/ruc-validator';
import { calculateIncomeTax, detectAnomalies } from '@/lib/sri-algorithms';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ruc = searchParams.get('ruc');

  if (!ruc) {
    return NextResponse.json({
      error: 'Parámetro "ruc" es requerido',
      ejemplo: '/api/sri?ruc=0901234567001',
    }, { status: 400 });
  }

  // 1. Validar RUC con algoritmo real
  const validation = validateRUC(ruc);

  if (!validation.isValid) {
    return NextResponse.json({
      success: false,
      ruc,
      validation,
      message: `RUC/Cédula inválido: ${validation.errors.join(', ')}`,
    }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    ruc,
    validation: {
      isValid: true,
      type: validation.type,
      typeName: getTypeName(validation.type),
      province: validation.provinceName,
      provinceCode: validation.province,
      cedula: validation.cedula,
    },
    message: `RUC válido — ${getTypeName(validation.type)} de ${validation.provinceName}`,
    metadata: {
      timestamp: new Date().toISOString(),
      engine: 'Perdix SRI Intelligence v2.0',
      algorithm: 'Checksum Módulo 10/11 (Algoritmo oficial SRI Ecuador)',
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ruc, annualIncome, deductibleExpenses = 0, monthsLate = 0 } = body;

    if (!ruc) {
      return NextResponse.json({ error: 'Campo "ruc" es requerido' }, { status: 400 });
    }

    // 1. Validar RUC
    const validation = validateRUC(ruc);

    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        ruc,
        validation,
        message: `RUC inválido: ${validation.errors.join(', ')}`,
      }, { status: 400 });
    }

    // 2. Determinar régimen tributario
    const income = annualIncome || 0;
    const regime = determineRegime(income);

    // 3. Calcular impuesto a la renta
    const incomeTax = calculateIncomeTax(income, deductibleExpenses);

    // 4. Calcular cuota RIMPE si aplica
    const rimpeQuota = calculateRIMPEQuota(income);

    // 5. Detectar anomalías
    const anomalies = income > 0 ? detectAnomalies(income, 0) : [];

    // 6. Estimar multas si hay retraso
    const latePenalty = monthsLate > 0 ? estimateLatePenalty(incomeTax.taxDue, monthsLate) : null;

    // 7. Calcular ahorro potencial
    const withoutDeductions = calculateIncomeTax(income, 0);
    const savingsFromDeductions = withoutDeductions.taxDue - incomeTax.taxDue;

    return NextResponse.json({
      success: true,
      contribuyente: {
        ruc,
        tipo: getTypeName(validation.type),
        provincia: validation.provinceName,
        cedula: validation.cedula,
      },
      regimen: regime,
      calculo: {
        ingresos_anuales: income,
        gastos_deducibles: deductibleExpenses,
        base_imponible: incomeTax.taxableIncome,
        impuesto_renta: incomeTax.taxDue,
        bracket_porcentaje: incomeTax.bracket,
        cuota_rimpe_mensual: rimpeQuota > 0 ? rimpeQuota : null,
        ahorro_por_deducciones: Number(savingsFromDeductions.toFixed(2)),
      },
      multas: latePenalty,
      alertas: anomalies,
      recomendaciones: generateRecommendations(income, incomeTax.taxDue, regime.regime, deductibleExpenses),
      metadata: {
        timestamp: new Date().toISOString(),
        engine: 'Perdix SRI Intelligence v2.0',
        algorithm: 'Checksum Mod10/11 + Tabla Impositiva 2025',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Error en el análisis fiscal',
      details: error.message,
    }, { status: 500 });
  }
}

function getTypeName(type: string): string {
  const names: Record<string, string> = {
    persona_natural: 'Persona Natural',
    sociedad_privada: 'Sociedad Privada',
    institucion_publica: 'Institución Pública',
    desconocido: 'Tipo Desconocido',
  };
  return names[type] || type;
}

function generateRecommendations(income: number, taxDue: number, regime: string, deductions: number): string[] {
  const recommendations: string[] = [];

  if (income > 0 && income <= 11902 && taxDue === 0) {
    recommendations.push('✅ Sus ingresos están dentro de la fracción básica exenta. No paga Impuesto a la Renta.');
  }

  if (income > 11902 && deductions === 0) {
    recommendations.push('💡 Puede reducir su impuesto declarando gastos personales deducibles (salud, educación, alimentación, vivienda, vestimenta).');
  }

  if (income > 20000 && regime === 'RIMPE - Negocio Popular') {
    recommendations.push('⚠️ Con ingresos superiores a $20,000, será recategorizado a RIMPE Emprendedor. Prepare facturación electrónica.');
  }

  if (regime === 'RIMPE - Emprendedor') {
    recommendations.push('📱 Recuerde: desde 2026, las facturas electrónicas deben transmitirse al SRI en tiempo real.');
  }

  if (income > 0) {
    recommendations.push('📅 Fechas clave: Declaración de Renta según 9no dígito del RUC (marzo-abril). IVA mensual hasta el 28 del mes siguiente.');
  }

  return recommendations;
}
