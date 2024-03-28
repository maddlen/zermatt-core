// @see https://cathalmacdonnacha.com/setting-up-eslint-prettier-in-vitejs

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  settings: {
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js'],
      },
    },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
  },
};
