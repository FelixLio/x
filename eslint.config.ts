import antfu from '@antfu/eslint-config'

export default antfu({
  markdown: false,
  formatters: {
    css: true,
  },
  pnpm: true,
  rules: {
    'jsdoc/empty-tags': 0,
    'e18e/prefer-static-regex': 0,
    'node/prefer-global/process': 0,
    'regexp/no-unused-capturing-group': 0,
    'no-template-curly-in-string': 0,
    'vue/no-template-shadow': 0,
    'vue/one-component-per-file': 0,
    'style/quote-props': 0,
    'test/prefer-lowercase-title': 0,
    'pnpm/yaml-enforce-settings': 0,
  },
})
