
/**
 * Algoritmos oficiales para el cálculo de Impuesto a la Renta
 * Basado en la tabla progresiva de personas naturales (SRI Ecuador 2025 aprox)
 */

export const TAX_BRACKETS_2025 = [
  { min: 0, max: 11902, taxProfile: 0, percentage: 0 },
  { min: 11902, max: 15159, taxProfile: 0, percentage: 5 },
  { min: 15159, max: 19682, taxProfile: 163, percentage: 10 },
  { min: 19682, max: 26031, taxProfile: 615, percentage: 12 },
  { min: 26031, max: 34255, taxProfile: 1377, percentage: 15 },
  { min: 34255, max: 45407, taxProfile: 2611, percentage: 20 },
  { min: 45407, max: 60450, taxProfile: 4841, percentage: 25 },
  { min: 60450, max: 80605, taxProfile: 8602, percentage: 30 },
  { min: 80605, max: 107199, taxProfile: 14648, percentage: 35 },
  { min: 107199, max: Infinity, taxProfile: 23956, percentage: 37 },
];

export function calculateIncomeTax(annualIncome: number, deductibleExpenses: number = 0): {
  taxableIncome: number;
  taxDue: number;
  bracket: number;
} {
  // 1. Base Imponible
  const taxableIncome = Math.max(0, annualIncome - deductibleExpenses);

  // 2. Encontrar el rango
  const bracket = TAX_BRACKETS_2025.find(
    (b) => taxableIncome >= b.min && taxableIncome < b.max
  ) || TAX_BRACKETS_2025[TAX_BRACKETS_2025.length - 1];

  // 3. Cálculo del impuesto
  const fractionBasic = bracket.min;
  const excendent = taxableIncome - fractionBasic;
  const taxOnExcedent = excendent * (bracket.percentage / 100);
  const taxDue = bracket.taxProfile + taxOnExcedent;

  return {
    taxableIncome,
    taxDue: Number(taxDue.toFixed(2)),
    bracket: bracket.percentage,
  };
}

export function detectAnomalies(income: number, taxPaid: number): string[] {
  const anomalies: string[] = [];
  const { taxDue } = calculateIncomeTax(income);
  
  const tolerance = 5.00; // $5 USD tolerance

  if (taxPaid < (taxDue - tolerance)) {
    anomalies.push(`Posible evasión: Impuesto pagado ($${taxPaid}) es menor al calculado ($${taxDue}).`);
  }
  
  if (income > 20000 && taxPaid === 0) {
    anomalies.push('Alerta de Alto Riesgo: Ingresos superiores a la base gravada sin pago de impuestos.');
  }

  return anomalies;
}
