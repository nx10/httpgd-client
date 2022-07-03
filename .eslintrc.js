module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte']
  },
  env: {
    es6: true,
    browser: true
  },
  overrides: [
    {
      files: ['*.{svelte,js}'],
      processor: 'svelte3/svelte3',
      rules: {
        // eslint-plugin-svelte3 seems to be really buggy with both reactive statements and module level components.
        // If you encounter false positive 'any' errors add here:
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      }
    }
  ],
  settings: {
    'svelte3/typescript': require('typescript')
  },
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['node_modules']
}