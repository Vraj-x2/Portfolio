// Flat ESLint config for the vanilla JS in assets/js/.
// Scripts run directly in the browser (no bundler/modules), so we
// declare the browser globals they rely on instead of adding a build step.
module.exports = [
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        FormData: 'readonly',
        IntersectionObserver: 'readonly',
        // Functions defined in one file and called from another
        // (plain <script> tags, shared global scope by design).
        typingEffect: 'writable',
        themeToggle: 'writable'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  }
];
