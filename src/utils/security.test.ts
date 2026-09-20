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

  it('rejects domain labels with leading or trailing hyphens', () => {
    expect(isValidEmail('user@-domain.com')).toBe(false);
    expect(isValidEmail('user@domain-.com')).toBe(false);
    expect(isValidEmail('user@-sub.domain.com')).toBe(false);
    expect(isValidEmail('user@sub-.domain.com')).toBe(false);
  });
});

describe('sanitizeInput', () => {
  it('escapes dangerous HTML special characters and backticks', () => {
    const dangerous = '<script>alert("xss")</script> & \'quote\' `backtick`';
    const sanitized = sanitizeInput(dangerous);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;quote&#x27; &#x60;backtick&#x60;');
  });

  it('strips null byte characters', () => {
    const nullByteInput = 'admin\0@domain.com';
    expect(sanitizeInput(nullByteInput)).toBe('admin@domain.com');
  });

  it('handles non-string inputs safely without throwing', () => {
    expect(sanitizeInput(12345 as unknown as string)).toBe('');
    expect(sanitizeInput(null as unknown as string)).toBe('');
    expect(sanitizeInput(undefined as unknown as string)).toBe('');
  });

  it('handles empty input gracefully', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('sanitizes event handler attributes and multi-line markup', () => {
    const payload = '<img src="x" onerror="alert(1)" />\n<b class="test">Safe Text</b>';
    const sanitized = sanitizeInput(payload);
    expect(sanitized).not.toContain('<img');
    expect(sanitized).toContain('&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot; /&gt;');
  });
});
