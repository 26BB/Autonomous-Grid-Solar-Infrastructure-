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
  // Extra safeguard against consecutive dots in local part or domain
  if (trimmed.includes('..')) return false;
  return true;
}

/**
 * Sanitizes input text by checking type safety, trimming whitespace, removing null bytes, and escaping HTML/template special characters.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/\0/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;');
}
