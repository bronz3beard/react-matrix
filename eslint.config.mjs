// ESLint 10 flat config (replaces .eslintrc.cjs). eslint-plugin-react was dropped
// because it does not support ESLint 10; the safety guarantee it provided for
// lib/ (no HTML injection) is enforced by the no-restricted-syntax rule below.
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist', 'dist-site'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
    ],
    plugins: { 'react-refresh': reactRefresh },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['lib/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message:
            'lib/ renders matrix data as text only; dangerouslySetInnerHTML is banned.',
        },
      ],
    },
  }
);
