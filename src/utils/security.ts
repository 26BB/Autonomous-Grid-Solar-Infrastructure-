/**
 * Security input validation and sanitization utilities.
 */

/**
 * Validates whether the given string is a properly formatted email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  // Security: Ensure domain has valid TLD structure and prevent consecutive dots or leading/trailing dashes in domain labels
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return false;
  // Extra safeguard against consecutive dots or leading/trailing dots in local part
  if (trimmed.includes('..') || trimmed.startsWith('.') || trimmed.split('@')[0]?.endsWith('.')) return false;
  return true;
}

/**
 * Sanitizes input text by checking type safety, enforcing max length limits, stripping ASCII/C1 control characters and Trojan Source BIDI formatting, and escaping HTML special characters.
 */
export function sanitizeInput(input: string, maxLength: number = 2000): string {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim().slice(0, maxLength);
  return trimmed
    // Security: Strip C0/C1 control characters, zero-width spaces, and Unicode BIDI formatting (Trojan Source attacks)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u0080-\u009F\u200B-\u200D\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;');
}
