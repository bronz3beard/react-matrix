// @ts-check
// Package purity gate. Proves the published package is ESM-only, has zero
// runtime dependencies, never bundles React, runs unbundled and eval-free,
// ships only allow-listed files and stays within its size budget.
// Uses node: built-ins only. Run after `npm run build`.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

// Budgets may only be raised with explicit Tech Lead approval.
const BUDGET_GZIP_BYTES = 10 * 1024;
// Raised from 60 kB with Tech Lead approval (2026-09-20) for the full README;
// this is install footprint, not what reaches a consumer's bundle.
const BUDGET_UNPACKED_BYTES = 80 * 1024;

const ALLOWED_IMPORTS = new Set(['react', 'react/jsx-runtime']);
// If this import is missing, React's JSX runtime was bundled instead of externalised.
const REQUIRED_IMPORT = 'react/jsx-runtime';
const FORBIDDEN_IN_DIST = [
  '__SECRET_INTERNALS',
  '__CLIENT_INTERNALS',
  'process.env',
  'import.meta.env',
  'require(',
  'eval(',
  'new Function',
  'innerHTML',
];
const ALLOWED_FILES = [
  /^package\.json$/,
  /^README\.md$/,
  /^LICENSE$/,
  /^dist\/index\.js$/,
  /^dist\/.+\.d\.ts$/,
];
const RUNTIME_DEPENDENCY_FIELDS = [
  'dependencies',
  'optionalDependencies',
  'bundleDependencies',
  'bundledDependencies',
];
const INSTALL_SCRIPTS = ['preinstall', 'install', 'postinstall', 'prepare'];

/** @type {string[]} */
const failures = [];
/** @param {boolean} ok @param {string} message */
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
for (const field of RUNTIME_DEPENDENCY_FIELDS) {
  check(!(field in pkg), `package.json must not declare "${field}"`);
}
check(
  JSON.stringify(Object.keys(pkg.peerDependencies ?? {}).sort()) === '["react","react-dom"]',
  'peerDependencies must be exactly react and react-dom'
);
check(pkg.type === 'module', 'package must be ESM-only ("type": "module")');
check(pkg.sideEffects === false, '"sideEffects" must be false');
check(
  JSON.stringify(Object.keys(pkg.exports ?? {})) === '["."]',
  'exports must have a single "." entry'
);
check(
  Object.keys(pkg.exports?.['.'] ?? {})[0] === 'types',
  'exports["."] must list "types" first'
);
for (const script of INSTALL_SCRIPTS) {
  check(!pkg.scripts?.[script], `"${script}" must not run on consumer install`);
}

const dist = readFileSync('dist/index.js', 'utf8');
const specifiers = [
  ...dist.matchAll(/\bfrom\s*["']([^"']+)["']|\bimport\s*\(?\s*["']([^"']+)["']/g),
].map((match) => match[1] ?? match[2]);
const bareImports = new Set(specifiers.filter((id) => !/^[./]/.test(id)));
for (const id of bareImports) {
  check(ALLOWED_IMPORTS.has(id), `dist/index.js imports "${id}", which is not allow-listed`);
}
check(
  bareImports.has(REQUIRED_IMPORT),
  `dist/index.js must import "${REQUIRED_IMPORT}" (otherwise React was bundled)`
);
for (const token of FORBIDDEN_IN_DIST) {
  check(!dist.includes(token), `dist/index.js must not contain "${token}"`);
}
const gzipBytes = gzipSync(dist).length;
check(
  gzipBytes <= BUDGET_GZIP_BYTES,
  `dist/index.js is ${gzipBytes} B gzip, over the ${BUDGET_GZIP_BYTES} B budget`
);

// `npm pack --json` changed shape: npm 10 returns an array of packed packages,
// npm 12 returns an object keyed by package name. The entries themselves are
// identical, so accept either rather than pinning an npm version here.
const packOutput = JSON.parse(
  execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    encoding: 'utf8',
  })
);
const [packed] = Array.isArray(packOutput) ? packOutput : Object.values(packOutput);
if (!packed?.files) {
  throw new Error(
    `could not read "npm pack --json" output (npm ${execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim()})`
  );
}
for (const { path } of packed.files) {
  check(
    ALLOWED_FILES.some((pattern) => pattern.test(path)),
    `tarball contains non-allow-listed file "${path}"`
  );
}
check(
  packed.unpackedSize <= BUDGET_UNPACKED_BYTES,
  `unpacked size ${packed.unpackedSize} B exceeds ${BUDGET_UNPACKED_BYTES} B`
);

console.log(
  `imports: ${[...bareImports].join(', ')} · dist: ${gzipBytes} B gzip · ` +
    `tarball: ${packed.files.length} files, ${packed.unpackedSize} B unpacked`
);
if (failures.length > 0) {
  console.error(`✗ package purity: ${failures.length} failure(s)\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('✓ package purity: all checks passed');
