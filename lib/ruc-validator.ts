/**
 * Validador de RUC/Cédula Ecuador
 * Implementa el algoritmo oficial de verificación (Módulo 10 y Módulo 11)
 * 
 * Estructura del RUC:
 * - 13 dígitos para personas naturales (cédula + "001")
 * - 13 dígitos para sociedades privadas (tercer dígito = 9)
 * - 13 dígitos para instituciones públicas (tercer dígito = 6)
 * 
 * La cédula son los primeros 10 dígitos del RUC de persona natural.
 */

// Provincias válidas de Ecuador (01-24 + 30 para extranjeros)
const VALID_PROVINCES = Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0'));
VALID_PROVINCES.push('30'); // Extranjeros

export type RUCType = 'persona_natural' | 'sociedad_privada' | 'institucion_publica' | 'desconocido';

export interface RUCValidationResult {
  isValid: boolean;
  type: RUCType;
  province: string;
  provinceName: string;
  errors: string[];
  cedula?: string;
}

const PROVINCE_NAMES: Record<string, string> = {
  '01': 'Azuay', '02': 'Bolívar', '03': 'Cañar', '04': 'Carchi',
  '05': 'Cotopaxi', '06': 'Chimborazo', '07': 'El Oro', '08': 'Esmeraldas',
  '09': 'Guayas', '10': 'Imbabura', '11': 'Loja', '12': 'Los Ríos',
  '13': 'Manabí', '14': 'Morona Santiago', '15': 'Napo', '16': 'Pastaza',
  '17': 'Pichincha', '18': 'Tungurahua', '19': 'Zamora Chinchipe',
  '20': 'Galápagos', '21': 'Sucumbíos', '22': 'Orellana',
  '23': 'Santo Domingo de los Tsáchilas', '24': 'Santa Elena',
  '30': 'Extranjero',
};

/**
 * Valida un número de RUC ecuatoriano usando el algoritmo oficial
 */
export function validateRUC(ruc: string): RUCValidationResult {
  const errors: string[] = [];
  const cleaned = ruc.replace(/\s|-/g, '');
  
  // Validación de longitud
  if (cleaned.length !== 13 && cleaned.length !== 10) {
    errors.push(`Longitud inválida: ${cleaned.length} dígitos (se esperan 10 para cédula o 13 para RUC)`);
    return { isValid: false, type: 'desconocido', province: '', provinceName: '', errors };
  }

  // Solo dígitos
  if (!/^\d+$/.test(cleaned)) {
    errors.push('El RUC/Cédula debe contener solo dígitos');
    return { isValid: false, type: 'desconocido', province: '', provinceName: '', errors };
  }

  // Validar provincia (primeros 2 dígitos)
  const provinceCode = cleaned.substring(0, 2);
  const provinceName = PROVINCE_NAMES[provinceCode] || 'Desconocida';
  
  if (!PROVINCE_NAMES[provinceCode]) {
    errors.push(`Código de provincia inválido: ${provinceCode}`);
    return { isValid: false, type: 'desconocido', province: provinceCode, provinceName, errors };
  }

  const thirdDigit = parseInt(cleaned[2]);
  let type: RUCType;
  let isValid = false;

  if (thirdDigit >= 0 && thirdDigit <= 5) {
    // Persona Natural (Módulo 10)
    type = 'persona_natural';
    isValid = validateMod10(cleaned.substring(0, 10));
    if (!isValid) errors.push('Dígito verificador inválido (Módulo 10)');
    
    // Si es RUC (13 dígitos) verificar que termina en "001" o similar
    if (cleaned.length === 13) {
      const establishment = cleaned.substring(10, 13);
      if (establishment === '000') {
        errors.push('El código de establecimiento no puede ser 000');
        isValid = false;
      }
    }
  } else if (thirdDigit === 6) {
    // Institución Pública (Módulo 11, posición 9)
    type = 'institucion_publica';
    isValid = validateMod11(cleaned.substring(0, 9), [3, 2, 7, 6, 5, 4, 3, 2]);
    if (!isValid) errors.push('Dígito verificador inválido (Módulo 11 - Pública)');
  } else if (thirdDigit === 9) {
    // Sociedad Privada (Módulo 11, posición 10)
    type = 'sociedad_privada';
    isValid = validateMod11(cleaned.substring(0, 10), [4, 3, 2, 7, 6, 5, 4, 3, 2]);
    if (!isValid) errors.push('Dígito verificador inválido (Módulo 11 - Privada)');
  } else {
    type = 'desconocido';
    errors.push(`Tercer dígito inválido: ${thirdDigit} (debe ser 0-5, 6, o 9)`);
  }

  return {
    isValid: isValid && errors.length === 0,
    type,
    province: provinceCode,
    provinceName,
    errors,
    cedula: type === 'persona_natural' ? cleaned.substring(0, 10) : undefined,
  };
}

/**
 * Algoritmo Módulo 10 — Personas Naturales
 * Coeficientes: [2, 1, 2, 1, 2, 1, 2, 1, 2]
 * Si producto > 9, restar 9
 * Suma total módulo 10. Si residuo = 0, verificador = 0, sino verificador = 10 - residuo
 */
function validateMod10(digits: string): boolean {
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let product = parseInt(digits[i]) * coefficients[i];
    if (product > 9) product -= 9;
    sum += product;
  }

  const remainder = sum % 10;
  const checkDigit = remainder === 0 ? 0 : 10 - remainder;
  return checkDigit === parseInt(digits[9]);
}

/**
 * Algoritmo Módulo 11 — Sociedades y Entidades Públicas
 */
function validateMod11(digits: string, coefficients: number[]): boolean {
  let sum = 0;
  
  for (let i = 0; i < coefficients.length; i++) {
    sum += parseInt(digits[i]) * coefficients[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder === 0 ? 0 : 11 - remainder;
  return checkDigit === parseInt(digits[coefficients.length]);
}

/**
 * Determina el régimen tributario basado en los ingresos anuales
 * Según normativa SRI 2025-2026
 */
export function determineRegime(annualIncome: number): {
  regime: string;
  description: string;
  obligations: string[];
  monthlyIVA: boolean;
  annualIncomeTax: boolean;
} {
  if (annualIncome <= 2500) {
    // No obligado según RIMPE 2026
    return {
      regime: 'No Obligado a Declarar',
      description: 'Con ingresos menores a la fracción básica, no está obligado a presentar declaración.',
      obligations: [],
      monthlyIVA: false,
      annualIncomeTax: false,
    };
  }
  
  if (annualIncome <= 20000) {
    return {
      regime: 'RIMPE - Negocio Popular',
      description: 'Régimen simplificado con cuota fija mensual. Ideal para emprendedores.',
      obligations: [
        'Declaración semestral de IVA',
        'Declaración anual de Impuesto a la Renta (formulario simplificado)',
      ],
      monthlyIVA: false,
      annualIncomeTax: true,
    };
  }
  
  if (annualIncome <= 300000) {
    return {
      regime: 'RIMPE - Emprendedor',
      description: 'Régimen para emprendedores con facturación electrónica obligatoria.',
      obligations: [
        'Declaración mensual de IVA',
        'Declaración anual de Impuesto a la Renta',
        'Facturación electrónica obligatoria',
        'Retenciones en la fuente (si aplica)',
      ],
      monthlyIVA: true,
      annualIncomeTax: true,
    };
  }

  return {
    regime: 'Régimen General',
    description: 'Régimen completo con todas las obligaciones tributarias.',
    obligations: [
      'Declaración mensual de IVA',
      'Declaración anual de Impuesto a la Renta',
      'Retenciones en la fuente mensuales',
      'Anexo transaccional simplificado (ATS)',
      'Facturación electrónica obligatoria',
      'Anticipo de Impuesto a la Renta',
    ],
    monthlyIVA: true,
    annualIncomeTax: true,
  };
}

/**
 * Calcula la cuota RIMPE Negocio Popular según tabla oficial
 */
export function calculateRIMPEQuota(annualIncome: number): number {
  if (annualIncome <= 2500) return 0;
  if (annualIncome <= 5000) return 3.00;   // $3/mes
  if (annualIncome <= 10000) return 5.00;  // $5/mes
  if (annualIncome <= 15000) return 10.00; // $10/mes
  if (annualIncome <= 20000) return 15.00; // $15/mes
  return 0; // No aplica RIMPE NP
}

/**
 * Estima multas por declaración tardía
 * Multa = 3% del impuesto causado por cada mes de retraso (máx 100%)
 * Más intereses por mora (según tasa del BCE)
 */
export function estimateLatePenalty(
  taxDue: number,
  monthsLate: number,
  bceCentralRate: number = 8.5 // Tasa referencial BCE 2026 aprox
): {
  penalty: number;
  interest: number;
  total: number;
  breakdown: string;
} {
  const penaltyRate = Math.min(monthsLate * 3, 100) / 100;
  const penalty = taxDue * penaltyRate;
  
  // Interés por mora: tasa BCE * 1.1 * (meses/12) * impuesto
  const annualInterestRate = bceCentralRate * 1.1 / 100;
  const interest = taxDue * annualInterestRate * (monthsLate / 12);

  return {
    penalty: Number(penalty.toFixed(2)),
    interest: Number(interest.toFixed(2)),
    total: Number((penalty + interest).toFixed(2)),
    breakdown: `Multa: ${(penaltyRate * 100).toFixed(0)}% del impuesto ($${penalty.toFixed(2)}) + Interés mora: $${interest.toFixed(2)} (${monthsLate} meses al ${(annualInterestRate * 100).toFixed(1)}% anual)`,
  };
}
