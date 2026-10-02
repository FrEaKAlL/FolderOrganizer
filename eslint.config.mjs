import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },

    plugins: {
      '@stylistic': stylistic,
    },

    rules: {
      // Calidad
      eqeqeq: 'error',
      'no-console': 'off',

      // Estilo
      '@stylistic/indent': ['error', 2],
      // Git normalizes text files; ESLint should accept the native checkout EOL on Windows/Linux.
      '@stylistic/linebreak-style': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
    },
  },
]
