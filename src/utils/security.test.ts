import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeInput } from './security';

describe('security utilities', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('sjenkins@ozarkelectric.coop')).toBe(true);
      expect(isValidEmail('john.doe+test@sub.domain.org')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
    });

    it('returns false for emails exceeding max length of 254 characters', () => {
      const longDomain = 'a'.repeat(250) + '@example.com';
      expect(isValidEmail(longDomain)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('escapes HTML special characters to prevent XSS', () => {
      const input = '<script>alert("xss")</script> & \'test\'';
      const expected = '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;test&#x27;';
      expect(sanitizeInput(input)).toBe(expected);
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('   hello world   ')).toBe('hello world');
    });

    it('handles empty input gracefully', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });
});
