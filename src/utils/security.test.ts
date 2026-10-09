import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, sanitizeInput } from './security';

describe('isValidEmail', () => {
  it('validates correct email addresses', () => {
    assert.equal(isValidEmail('user@example.com'), true);
    assert.equal(isValidEmail('admin.test@sub.domain.co.uk'), true);
    assert.equal(isValidEmail('  director@rural-electric.coop  '), true);
    assert.equal(isValidEmail('o\'connor@example.com'), true);
    assert.equal(isValidEmail('r&d@coop.org'), true);
    assert.equal(isValidEmail('user+tag@domain.com'), true);
  });

  it('rejects invalid email addresses and edge cases', () => {
    assert.equal(isValidEmail('invalid-email'), false);
    assert.equal(isValidEmail('user@'), false);
    assert.equal(isValidEmail('@domain.com'), false);
    assert.equal(isValidEmail('user@domain..com'), false);
    assert.equal(isValidEmail('user@domain'), false);
    assert.equal(isValidEmail('user@domain@extra.com'), false);
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

  it('rejects email addresses with leading or trailing dots in local part', () => {
    assert.equal(isValidEmail('.user@example.com'), false);
    assert.equal(isValidEmail('user.@example.com'), false);
  });

  it('enforces RFC 5321 max 64 character local part restriction', () => {
    const valid64 = 'a'.repeat(64) + '@example.com';
    assert.equal(isValidEmail(valid64), true);

    const invalid65 = 'a'.repeat(65) + '@example.com';
    assert.equal(isValidEmail(invalid65), false);
  });

  it('handles &apos; HTML entity unescaping and enforces domain length limits', () => {
    assert.equal(isValidEmail('o&apos;connor@example.com'), true);
    assert.equal(isValidEmail('o&#X27;connor@example.com'), true);
    assert.equal(isValidEmail('o&#x027;connor@example.com'), true);
    assert.equal(isValidEmail('o&#X0027;connor@example.com'), true);
    assert.equal(isValidEmail('o&#39;connor@example.com'), true);
    assert.equal(isValidEmail('o&#039;connor@example.com'), true);
    assert.equal(isValidEmail('r&#x26;d@example.com'), true);
    assert.equal(isValidEmail('r&#X26;d@example.com'), true);
    assert.equal(isValidEmail('r&#x026;d@example.com'), true);
    assert.equal(isValidEmail('r&#X0026;d@example.com'), true);
    assert.equal(isValidEmail('r&#38;d@example.com'), true);
    assert.equal(isValidEmail('r&#038;d@example.com'), true);
    assert.equal(isValidEmail('r&AMP;d@example.com'), true);

    const longDomain = 'user@' + 'a'.repeat(250) + '.com';
    assert.equal(isValidEmail(longDomain), false);

    // RFC 1035 / RFC 5321 specifies maximum FQDN domain length is 253 characters
    // Max valid email length is 254 (1 char local + 1 '@' + 252 char domain = 254 chars)
    const domain252 = 'a'.repeat(63) + '.' + 'a'.repeat(63) + '.' + 'a'.repeat(63) + '.' + 'a'.repeat(56) + '.com'; // length 252
    assert.equal(domain252.length, 252);
    assert.equal(isValidEmail('u@' + domain252), true);

    const domain253 = 'a'.repeat(63) + '.' + 'a'.repeat(63) + '.' + 'a'.repeat(63) + '.' + 'a'.repeat(57) + '.com'; // length 253
    assert.equal(domain253.length, 253);
    assert.equal(isValidEmail('u@' + domain253), false);
  });
});

describe('sanitizeInput', () => {
  it('escapes dangerous HTML special characters and backticks', () => {
    const dangerous = '<script>alert("xss")</script> & \'quote\' `backtick`';
    const sanitized = sanitizeInput(dangerous);
    assert.equal(sanitized.includes('<script>'), false);
    assert.equal(sanitized, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#x27;quote&#x27; &#x60;backtick&#x60;');
  });

  it('strips null byte and ASCII control characters', () => {
    const nullByteInput = 'admin\0@domain.com';
    assert.equal(sanitizeInput(nullByteInput), 'admin@domain.com');

    const controlCharsInput = 'hello\x07world\x1Ftest\x7F';
    assert.equal(sanitizeInput(controlCharsInput), 'helloworldtest');
  });

  it('strips C1 control characters, zero-width spaces, and BIDI Trojan Source characters', () => {
    const bidiInput = 'user\u202E@domain.com\u200B\u0085';
    assert.equal(sanitizeInput(bidiInput), 'user@domain.com');
  });

  it('strips unpaired Unicode surrogates safely', () => {
    const unpairedHigh = 'user\uD83D@domain.com';
    assert.equal(sanitizeInput(unpairedHigh), 'user@domain.com');

    const unpairedLow = 'user\uDE00@domain.com';
    assert.equal(sanitizeInput(unpairedLow), 'user@domain.com');
  });

  it('enforces maxLength parameter truncation', () => {
    const longInput = 'a'.repeat(3000);
    const sanitizedDefault = sanitizeInput(longInput);
    assert.equal(sanitizedDefault.length, 2000);

    const sanitizedCustom = sanitizeInput(longInput, 10);
    assert.equal(sanitizedCustom.length, 10);
    assert.equal(sanitizedCustom, 'a'.repeat(10));
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

  it('correctly sanitizes and truncates form field values with specific maxLengths', () => {
    const longName = 'Sarah Jenkins ' + 'x'.repeat(200);
    const sanitizedName = sanitizeInput(longName, 100);
    assert.equal(sanitizedName.length, 100);
    assert.equal(sanitizedName.startsWith('Sarah Jenkins'), true);

    const dangerousMessage = 'Urgent Inquiry\0\x07 ' + '<script>alert(1)</script> ' + 'a'.repeat(1500);
    const sanitizedMessage = sanitizeInput(dangerousMessage, 1000);
    assert.equal(sanitizedMessage.includes('<script>'), false);
    assert.equal(sanitizedMessage.includes('\0'), false);
    assert.equal(sanitizedMessage.includes('\x07'), false);
  });

  it('sanitizes email input before passing to isValidEmail validation', () => {
    const dangerousEmail = '<script>alert(1)</script>user@example.com';
    const cleanEmail = sanitizeInput(dangerousEmail, 254);
    assert.equal(isValidEmail(cleanEmail), false);

    const validWithPadding = '  user@example.com  ';
    const cleanValidEmail = sanitizeInput(validWithPadding, 254);
    assert.equal(isValidEmail(cleanValidEmail), true);

    const oConnor = '  o\'connor@rural-electric.coop  ';
    const cleanOConnor = sanitizeInput(oConnor, 254);
    assert.equal(isValidEmail(cleanOConnor), true);
    assert.equal(cleanOConnor.includes('&#x27;'), true);

    const rAndD = '  r&d@coop.org  ';
    const cleanRAndD = sanitizeInput(rAndD, 254);
    assert.equal(isValidEmail(cleanRAndD), true);
    assert.equal(cleanRAndD.includes('&amp;'), true);
  });
});
