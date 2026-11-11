import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Modal and Component Google Material Symbols Icon Accessibility', () => {
  const componentFiles = [
    'src/components/BoardBriefModal.tsx',
    'src/components/Part108Modal.tsx',
    'src/components/PlatformSpecsModal.tsx',
    'src/components/GrantChecklistModal.tsx',
    'src/components/ContactPortalModal.tsx',
    'src/components/ProposalPackageModal.tsx',
    'src/components/ModelerScreen.tsx',
  ];

  it('ensures all decorative Material Symbols icon elements have aria-hidden="true"', () => {
    for (const relativePath of componentFiles) {
      const fullPath = path.resolve(process.cwd(), relativePath);
      assert.ok(fs.existsSync(fullPath), `File does not exist: ${relativePath}`);

      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        if (line.includes('material-symbols-outlined')) {
          assert.ok(
            line.includes('aria-hidden="true"'),
            `Decorative icon element at ${relativePath}:${index + 1} is missing aria-hidden="true":\n  ${line.trim()}`
          );
        }
      });
    }
  });
});
