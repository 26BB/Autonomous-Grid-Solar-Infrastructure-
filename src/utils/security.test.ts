import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeInput } from './security';

describe('security utilities', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('jsmith@valleyelectric.coop')).toBe(true);
      expect(isValidEmail('admin.test@sub.domain.co.uk')).toBe(true);
      expect(isValidEmail('  director@rural-electric.coop  ')).toBe(true);
    });

    it('returns false for invalid email addresses and edge cases', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
      expect(isValidEmail('user@domain..com')).toBe(false);
      expect(isValidEmail('user@domain')).toBe(false);
      expect(isValidEmail('a'.repeat(255) + '@example.com')).toBe(false);
    });

    it('returns false for non-string or empty inputs', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null as unknown as string)).toBe(false);
      expect(isValidEmail(undefined as unknown as string)).toBe(false);
      expect(isValidEmail(123 as unknown as string)).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('escapes special HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      );
      expect(sanitizeInput("User's & Company")).toBe('User&#x27;s &amp; Company');
    });

    it('trims leading and trailing whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
    });

    it('safely handles non-string or empty inputs without throwing', () => {
      expect(sanitizeInput('')).toBe('');
      expect(sanitizeInput(null as unknown as string)).toBe('');
      expect(sanitizeInput(undefined as unknown as string)).toBe('');
      expect(sanitizeInput(12345 as unknown as string)).toBe('');
    });
  });
});
