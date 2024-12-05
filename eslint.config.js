import js from '@eslint/js';
import globals from 'globals';
import prettier from 'prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import importAlias from 'eslint-plugin-import-alias';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintPrettier from 'eslint-plugin-prettier/recommended';

export default [
  eslintPrettier,
  { ignores: ['dist', 'storybook-static'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.react,
        ...globals.browser,
        ...globals.typescriptEslint,
        ...globals.typescriptParser,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      import: importPlugin,
      'import-alias': importAlias,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,

      // General rules
      'no-restricted-syntax': 'error',
      'no-misleading-character-class': 'error',
      'no-unused-vars': 'off',
      'no-unreachable': 'error',
      'no-console': 'off',

      // TypeScript rules
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',

      // React rules
      'react/jsx-no-target-blank': 'off',
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      'react/jsx-key': 'warn',
      'react/no-children-prop': 'warn',
      'react/no-unused-prop-types': 'error',
      'react/no-array-index-key': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unstable-nested-components': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Import-related rules
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': 'error',
      'import/no-cycle': 'error',
      'import/extensions': [
        'error',
        'never',
        {
          svg: 'always',
          scss: 'always',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', 'parent', ['sibling', 'index'], 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin', 'external', 'type'],
          warnOnUnassignedImports: false,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',

      // Accessibility rules
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/role-has-required-aria-props': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/alt-text': 'off',
    },
  },
  {
    files: ['*.stories.tsx'],
    rules: {
      'import/no-anonymous-default-export': 'off',
      'import/no-default-export': 'off',
      'import/prefer-default-export': [
        'warn',
        {
          target: 'any',
        },
      ],
    },
  },
];
