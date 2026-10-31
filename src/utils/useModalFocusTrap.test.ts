import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { useModalFocusTrap } from './useModalFocusTrap';

import fs from 'node:fs';
import path from 'node:path';

describe('useModalFocusTrap', () => {
  it('exports hook function', () => {
    assert.equal(typeof useModalFocusTrap, 'function');
  });

  it('verifies all modal components add aria-hidden="true" to decorative Material Symbols icons', () => {
    const modalFiles = [
      'BoardBriefModal.tsx',
      'ContactPortalModal.tsx',
      'GrantChecklistModal.tsx',
      'Part108Modal.tsx',
      'PlatformSpecsModal.tsx',
      'ProposalPackageModal.tsx',
    ];

    for (const filename of modalFiles) {
      const filepath = path.join(process.cwd(), 'src', 'components', filename);
      const content = fs.readFileSync(filepath, 'utf8');
      const matches = content.match(/<span[^>]*className="[^"]*material-symbols-outlined[^"]*"[^>]*>/g) || [];

      assert.ok(matches.length > 0, `Expected modal ${filename} to have material-symbols icons`);
      for (const match of matches) {
        assert.ok(
          match.includes('aria-hidden="true"'),
          `Icon tag in ${filename} missing aria-hidden="true": ${match}`
        );
      }
    }
  });
});
