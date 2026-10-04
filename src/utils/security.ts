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
  // Security: Handle HTML-escaped entities if sanitizeInput was called prior to email validation
  const unescaped = trimmed
    .replace(/&amp;/gi, '&')
    .replace(/&#x26;/gi, '&')
    .replace(/&#0*38;/g, '&')
    .replace(/&#x27;/gi, '\'')
    .replace(/&#0*39;/g, '\'')
    .replace(/&apos;/gi, '\'');
  // Security: RFC 5321 specifies that local part <= 64 chars, domain part <= 255 chars, and email contains exactly one '@'
  const parts = unescaped.split('@');
  if (parts.length !== 2) return false;
  const localPart = parts[0];
  const domainPart = parts[1];
  if (!localPart || localPart.length > 64 || !domainPart || domainPart.length > 255) return false;
  // Security: RFC 5322 compliant local part characters (including apostrophes and ampersands) and valid TLD structure
  const emailRegex = /^[a-zA-Z0-9._%+'&-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(unescaped)) return false;
  // Extra safeguard against consecutive dots or leading/trailing dots in local part
  if (unescaped.includes('..') || unescaped.startsWith('.') || localPart.endsWith('.')) return false;
  return true;
}

/**
 * Sanitizes input text by checking type safety, enforcing max length limits, stripping ASCII/C1 control characters and Trojan Source BIDI formatting, and escaping HTML special characters.
 */
export function sanitizeInput(input: string, maxLength: number = 2000): string {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim().slice(0, maxLength);
  return trimmed
    // Security: Remove unpaired surrogates caused by truncation or malformed UTF-16 input
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '')
    // Security: Strip C0/C1 control characters, zero-width spaces, and Unicode BIDI formatting (Trojan Source attacks)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u0080-\u009F\u200B-\u200D\u200E\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;');
}
