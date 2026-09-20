// Proves that importing one preset does not pull the other 25 into a consumer's
// bundle, and that such a bundle stays within its size budget (plan §1.4).
// Bundles a fixture against the built `dist/` with Vite's own build API.
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build } from 'vite';

// Raised from 5 kB with Tech Lead approval (2026-09-20): the component alone is
// ~5.0 kB, so 5 kB left no room for even one preset (~335 B each).
const BUDGET_GZIP_BYTES = 6 * 1024;
const KEPT = 'aurora';
const WORK_DIR = 'node_modules/.cache/treeshake';

const { presets } = await import(pathToFileURL(`${process.cwd()}/dist/index.js`).href);
const keptName = presets[KEPT].name;
// `original` is the component's default theme, so it ships with the component
// whatever else you import.
const otherNames = Object.entries(presets)
  .filter(([key]) => key !== KEPT && key !== 'original')
  .map(([, theme]) => theme.name);

mkdirSync(WORK_DIR, { recursive: true });
const entry = `${WORK_DIR}/entry.js`;
writeFileSync(
  entry,
  `import ReactMatrix, { ${KEPT} } from '${process.cwd()}/dist/index.js';\nexport { ReactMatrix, ${KEPT} };\n`
);

const result = await build({
  logLevel: 'silent',
  // Without this the project's vite.config.ts (the demo site) is merged in, and
  // the gallery references every preset.
  configFile: false,
  build: {
    write: false,
    minify: true,
    lib: { entry, formats: ['es'], fileName: 'bundle' },
    rolldownOptions: { external: /^react(-dom)?($|\/)/ },
  },
});
const code = [result].flat()[0].output[0].code;
const gzipBytes = gzipSync(code).length;

const leaked = otherNames.filter((name) => code.includes(name));
const failures = [];
if (!code.includes(keptName)) failures.push(`the imported preset "${keptName}" is missing`);
if (leaked.length > 0) failures.push(`unused presets bundled: ${leaked.join(', ')}`);
if (gzipBytes > BUDGET_GZIP_BYTES) {
  failures.push(`one-preset bundle is ${gzipBytes} B gzip, over the ${BUDGET_GZIP_BYTES} B budget`);
}

console.log(
  `tree-shaking: component + "${keptName}" = ${gzipBytes} B gzip; ` +
    `${otherNames.length - leaked.length}/${otherNames.length} other presets dropped`
);
if (failures.length > 0) {
  console.error(`✗ tree-shaking: ${failures.length} failure(s)\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('✓ tree-shaking: only the imported preset ships');
