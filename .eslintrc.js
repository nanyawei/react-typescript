module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'reqct-app',
    // 'airbnb'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint',
    'react',
  ],
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: false,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react-hooks/exhaustive-deps": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'default-case': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
