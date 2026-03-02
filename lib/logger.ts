
/**
 * PII Shield Logger
 * Sistema de registro seguro que ofusca automáticamente datos sensibles
 * como emails, contraseñas y claves API antes de imprimirlos.
 */

const SENSITIVE_KEYS = ['password', 'token', 'secret', 'key', 'auth', 'authorization', 'cvv', 'credit_card'];
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

function maskPII(data: any): any {
  if (typeof data === 'string') {
    // Mask Emails
    return data.replace(EMAIL_REGEX, '***@***.***');
  }

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(maskPII);
    }
    
    const masked: any = {};
    for (const key in data) {
      if (SENSITIVE_KEYS.some(k => key.toLowerCase().includes(k))) {
        masked[key] = '[REDACTED]';
      } else {
        masked[key] = maskPII(data[key]);
      }
    }
    return masked;
  }

  return data;
}

export const logger = {
  info: (message: string, context?: any) => {
    console.log(`[INFO] ${message}`, context ? JSON.stringify(maskPII(context)) : '');
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error ? JSON.stringify(maskPII(error)) : '');
  },
  warn: (message: string, context?: any) => {
    console.warn(`[WARN] ${message}`, context ? JSON.stringify(maskPII(context)) : '');
  },
  debug: (message: string, context?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${message}`, context ? JSON.stringify(maskPII(context)) : '');
    }
  }
};
