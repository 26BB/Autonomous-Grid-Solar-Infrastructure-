import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, sanitizeInput } from './security';

describe('isValidEmail', () => {
  it('validates correct email addresses', () => {
    assert.equal(isValidEmail('user@example.com'), true);
    assert.equal(isValidEmail('admin.test@sub.domain.co.uk'), true);
    assert.equal(isValidEmail('  director@rural-electric.coop  '), true);
  });

  it('rejects invalid email addresses and edge cases', () => {
    assert.equal(isValidEmail('invalid-email'), false);
    assert.equal(isValidEmail('user@'), false);
    assert.equal(isValidEmail('@domain.com'), false);
    assert.equal(isValidEmail('user@domain..com'), false);
    assert.equal(isValidEmail('user@domain'), false);
    assert.equal(isValidEmail(''), false);
    assert.equal(isValidEmail(null as unknown as string), false);
    assert.equal(isValidEmail('a'.repeat(255) + '@example.com'), false);
  });

  it('rejects domain labels with leading or trailing hyphens', () => {
    assert.equal(isValidEmail('user@-domain.com'), false);
    assert.equal(isValidEmail('user@domain-.com'), false);
    assert.equal(isValidEmail('user@-sub.domain.com'), false);
    assert.equal(isValidEmail('user@sub-.domain.com'), false);
  });
});

describe('sanitizeInput', () => {
  it('escapes dangerous HTML special characters and backticks', () => {
    const dangerous = '<script>alert("xss")</script> & \'quote\' `backtick`';
    const sanitized = sanitizeInput(dangerous);
    assert.equal(sanitized.includes('<script>'), false);
    assert.equal(sanitized, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;quote&#x27; &#x60;backtick&#x60;');
  });

  it('strips null bytes and non-printable ASCII control characters', () => {
    const controlCharInput = 'admin\0\x07\x1B@domain.com\nline2';
    assert.equal(sanitizeInput(controlCharInput), 'admin@domain.com\nline2');
  });

  it('handles non-string inputs safely without throwing', () => {
    assert.equal(sanitizeInput(12345 as unknown as string), '');
    assert.equal(sanitizeInput(null as unknown as string), '');
    assert.equal(sanitizeInput(undefined as unknown as string), '');
  });

  it('handles empty input gracefully', () => {
    assert.equal(sanitizeInput(''), '');
  });

  it('sanitizes event handler attributes and multi-line markup', () => {
    const payload = '<img src="x" onerror="alert(1)" />\n<b class="test">Safe Text</b>';
    const sanitized = sanitizeInput(payload);
    assert.equal(sanitized.includes('<img'), false);
    assert.equal(sanitized.includes('&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot; /&gt;'), true);
  });
});
