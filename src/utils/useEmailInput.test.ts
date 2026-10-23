import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { useEmailInput, validateAndSanitizeEmailInput } from './useEmailInput';

describe('useEmailInput & validateAndSanitizeEmailInput', () => {
  it('exports useEmailInput hook function and pure helper', () => {
    assert.equal(typeof useEmailInput, 'function');
    assert.equal(typeof validateAndSanitizeEmailInput, 'function');
  });

  it('validates correct email address and sanitizes whitespace', () => {
    const res = validateAndSanitizeEmailInput('  valid.user@utility.coop  ');
    assert.equal(res.isValid, true);
    assert.equal(res.cleanEmail, 'valid.user@utility.coop');
    assert.equal(res.error, null);
  });

  it('rejects invalid email address and sets custom error message', () => {
    const res = validateAndSanitizeEmailInput('not-an-email', 'Please enter a valid utility email.');
    assert.equal(res.isValid, false);
    assert.equal(res.cleanEmail, 'not-an-email');
    assert.equal(res.error, 'Please enter a valid utility email.');
  });

  it('sanitizes dangerous HTML special characters before email validation', () => {
    const res = validateAndSanitizeEmailInput('<script>alert("xss")</script>user@coop.org');
    assert.equal(res.isValid, false);
    assert.equal(res.cleanEmail, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;user@coop.org');
  });

  it('enforces RFC max email length truncation', () => {
    const longLocal = 'a'.repeat(300) + '@coop.org';
    const res = validateAndSanitizeEmailInput(longLocal);
    assert.equal(res.cleanEmail.length, 254);
    assert.equal(res.isValid, false);
  });
});
