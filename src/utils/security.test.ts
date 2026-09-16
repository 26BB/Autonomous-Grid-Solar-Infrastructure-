// @ts-ignore
import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeInput } from './security';

describe('isValidEmail', () => {
  it('validates correct email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('admin.test@sub.domain.co.uk')).toBe(true);
    expect(isValidEmail('  director@rural-electric.coop  ')).toBe(true);
  });

  it('rejects invalid email addresses and edge cases', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@domain..com')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail(null as unknown as string)).toBe(false);
    expect(isValidEmail('a'.repeat(255) + '@example.com')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('escapes dangerous HTML special characters', () => {
    const dangerous = '<script>alert("xss")</script> & \'quote\'';
    const sanitized = sanitizeInput(dangerous);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;quote&#x27;');
  });

  it('handles empty input gracefully', () => {
    expect(sanitizeInput('')).toBe('');
  });
});
