import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeInput } from './security';

describe('security utilities', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('sjenkins@ozarkelectric.coop')).toBe(true);
      expect(isValidEmail('john.doe+test@sub.domain.org')).toBe(true);
      expect(isValidEmail('  director@rural-electric.coop  ')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
      expect(isValidEmail(null as unknown as string)).toBe(false);
    });

    it('returns false for emails exceeding max length of 254 characters', () => {
      const longDomain = 'a'.repeat(250) + '@example.com';
      expect(isValidEmail(longDomain)).toBe(false);
      expect(isValidEmail('a'.repeat(255) + '@example.com')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('escapes HTML special characters to prevent XSS', () => {
      const input = '<script>alert("xss")</script> & \'test\'';
      const expected = '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;test&#x27;';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe(expected);
      expect(sanitized).not.toContain('<script>');
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('   hello world   ')).toBe('hello world');
    });

    it('handles empty input gracefully', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });
});
