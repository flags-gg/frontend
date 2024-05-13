module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/*', './src/*'],
          ['@L/*', './src/pages/*'],
          ['@C/*', './src/components/*'],
          ['@HC/*', './src/pages/Homepage/components/*'],
          ['@DC/*', './src/pages/Dashboard/components/*'],
          ['@DL/*', './src/pages/Dashboard/lib/*'],
        ],
        extensions: [
          '.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
      },
    },
  },
}

