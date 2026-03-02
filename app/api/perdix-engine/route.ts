import { NextResponse } from 'next/server';
import { validateRUC, determineRegime, estimateLatePenalty } from '@/lib/ruc-validator';
import { calculateIncomeTax, detectAnomalies } from '@/lib/sri-algorithms';

/**
 * Perdix Engine — Motor de Procesamiento Real
 * Redirige acciones al motor SRI Intelligence real
 */
export async function POST(req: Request) {
  try {
    const { action, payload } = await req.json();

    switch (action) {
      case 'AUDIT_SRI': {
        // Motor real: validación de RUC + cálculo fiscal
        const ruc = payload?.ruc || '';
        const income = payload?.annualIncome || 0;
        
        const validation = validateRUC(ruc);
        if (!validation.isValid) {
          return NextResponse.json({
            status: 'error',
            message: `RUC inválido: ${validation.errors.join(', ')}`,
          });
        }

        const tax = calculateIncomeTax(income);
        const regime = determineRegime(income);
        const anomalies = detectAnomalies(income, payload?.taxPaid || 0);

        return NextResponse.json({
          status: 'success',
          contribuyente: {
            tipo: validation.type,
            provincia: validation.provinceName,
          },
          regimen: regime.regime,
          impuesto: tax.taxDue,
          anomalies: anomalies.length,
          detalles_anomalias: anomalies,
          message: `Análisis completado con motor SRI Intelligence v2.0. Régimen: ${regime.regime}.`,
        });
      }

      case 'VALIDATE_RUC': {
        const validation = validateRUC(payload?.ruc || '');
        return NextResponse.json({
          status: validation.isValid ? 'success' : 'error',
          validation,
        });
      }

      default:
        return NextResponse.json({ 
          error: 'Acción no reconocida',
          available_actions: ['AUDIT_SRI', 'VALIDATE_RUC'],
        }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
