module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/prop-types': 'off', // Desactivar las proptypes
    'react/react-in-jsx-scope': 'off' //  Does not show error: 'React' must be in scope when using JSX react/react-in-jsx-scope
  }
}
