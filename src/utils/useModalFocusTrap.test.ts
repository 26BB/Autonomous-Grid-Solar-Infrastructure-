import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { useModalFocusTrap } from './useModalFocusTrap';

describe('useModalFocusTrap', () => {
  it('exports hook function', () => {
    assert.equal(typeof useModalFocusTrap, 'function');
  });
});
