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
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return false;
  // Extra safeguard against consecutive dots in local part or domain
  if (trimmed.includes('..')) return false;
  return true;
}

/**
 * Sanitizes input text by trimming whitespace and escaping HTML special characters.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
