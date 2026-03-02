
import { calculateIncomeTax, detectAnomalies } from '../lib/sri-algorithms';

describe('SRI Algorithms - Income Tax Calculation', () => {
  test('Should return 0 tax for income below base margin', () => {
    const result = calculateIncomeTax(10000);
    expect(result.taxDue).toBe(0);
    expect(result.bracket).toBe(0);
  });

  test('Should calculate correct tax for middle bracket (approx 20k)', () => {
    // 20000 income
    // Bracket: 19682 - 26031 (12%)
    // Base Tax: 615
    // Excedent: 20000 - 19682 = 318
    // Tax on Excedent: 318 * 0.12 = 38.16
    // Total: 615 + 38.16 = 653.16
    const result = calculateIncomeTax(20000);
    expect(result.taxDue).toBeCloseTo(653.16, 1);
    expect(result.bracket).toBe(12);
  });

  test('Should handle deductible expenses', () => {
    const income = 25000;
    const expenses = 14000; // Taxable = 11000
    const result = calculateIncomeTax(income, expenses);
    expect(result.taxableIncome).toBe(11000);
    expect(result.taxDue).toBe(0); // Under 11902
  });
});

describe('SRI Algorithms - Anomaly Detection', () => {
  test('Should detect tax evasion', () => {
    const income = 50000;
    const taxPaid = 0;
    const anomalies = detectAnomalies(income, taxPaid);
    expect(anomalies).toHaveLength(2);
    expect(anomalies[0]).toContain('Posible evasión');
    expect(anomalies[1]).toContain('Alerta de Alto Riesgo');
  });

  test('Should return empty array for correct payments', () => {
    const income = 20000;
    const calculated = calculateIncomeTax(income).taxDue;
    const anomalies = detectAnomalies(income, calculated);
    expect(anomalies).toHaveLength(0);
  });
});
