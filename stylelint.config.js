/** @type {import('stylelint').Config} */
export default {
  defaultSeverity: 'error',
  plugins: ['stylelint-eevenkoto'],
  rules: {},
  overrides: [
    {
      files: ['packages/css/tokens/tokens.css'],
      rules: {
        'eevenkoto/no-raw-color-literals': true,
        'eevenkoto/require-text-tuple': true,
        'eevenkoto/require-disabled-tuple': true,
        'eevenkoto/no-inverse-token': true,
      },
    },
    {
      files: ['packages/css/core/**/*.css', 'packages/css/domain/**/*.css'],
      rules: {
        'eevenkoto/no-primitive-in-components': true,
        'eevenkoto/no-raw-color-literals': true,
        'eevenkoto/enforce-private-bridge': true,
        'eevenkoto/no-self-referencing-vars': true,
      },
    },
  ],
};
